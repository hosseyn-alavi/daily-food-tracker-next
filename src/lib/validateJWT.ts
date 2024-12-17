import jwt from "jsonwebtoken";
import {type NextRequest, NextResponse} from "next/server";

const SECRET_KEY = process.env.SECRET_KEY ?? "";

export type Params = {params: Record<string, string>};
export type TokenValues = {
    username: string;
    userId: number;
    dailyGoal: number;
    iat: number;
    exp: number;
};

export function withAuth(
    handler: (
        req: NextRequest,
        params: Params,
        values: TokenValues
    ) => Promise<NextResponse>
) {
    return async (req: NextRequest, params: Params) => {
        try {
            const tokenValues = authorizeApi(req);

            return await handler(req, params, tokenValues);
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

function validateJWT(token: string) {
    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded as TokenValues;
    } catch (error) {
        throw NextResponse.json({error: "Unauthorized"}, {status: 403});
    }
}

function authorizeApi(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        throw NextResponse.json({error: "Unauthorized"}, {status: 403});
    }

    const token = authHeader.split(" ")[1];
    return validateJWT(token);
}
