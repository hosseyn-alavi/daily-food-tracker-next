import jwt from "jsonwebtoken";
import {type NextRequest, NextResponse} from "next/server";

const SECRET_KEY = process.env.SECRET_KEY ?? "";

function validateJWT(token: string) {
    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded as {
            username: string;
            userId: number;
            dailyGoal: number;
            iat: number;
            exp: number;
        }; // Return decoded payload (user details)
    } catch (error) {
        throw NextResponse.json({error: "Unauthorized"}, {status: 403});
    }
}

export function authorizeApi(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader?.startsWith("Bearer ")) {
        throw NextResponse.json({error: "Unauthorized"}, {status: 403});
    }

    const token = authHeader.split(" ")[1];
    return validateJWT(token);
}

type Params = {params:{id:string}}

export function withAuth(handler: (req: NextRequest, params:Params) => Promise<NextResponse>) {
    return async (req: NextRequest, params:Params) => {
        try {
            authorizeApi(req);

            return await handler(req, params);
        } catch (error: unknown) {
            const err = error as {status: number; message: string};

            if (err.status === 403) {
                return NextResponse.json(
                    {error: err.message || "Unauthorized"},
                    {status: 403}
                );
            }

            console.error("Internal server error:", err.message);
            return NextResponse.json(
                {error: "Internal server error"},
                {status: 500}
            );
        }
    };
}
