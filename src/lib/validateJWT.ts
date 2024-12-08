import jwt from "jsonwebtoken";
import {NextResponse} from "next/server";

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
        throw new Error("Invalid or expired token");
    }
}

export function authorizeApi(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader?.startsWith("Bearer ")) {
        throw NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const token = authHeader.split(" ")[1];
    return validateJWT(token);
}
