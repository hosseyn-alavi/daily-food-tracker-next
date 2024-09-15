import {User} from "@/models/User";
import jwt from "jsonwebtoken";
import {NextResponse} from "next/server";
import {z} from "zod";

const LoginSchema = z.object({
    username: z.string().min(3, "username name is required"),
    password: z.string().min(3, "password name is required"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedBody = LoginSchema.safeParse(body);
        if (!parsedBody.success) {
            return NextResponse.json(parsedBody.error.issues, {status: 400});
        }

        const user = await User.findOne({
            where: {
                username: body.username,
                password: body.password,
            },
        });

        if (user) {
            // Generate JWT token
            const token = jwt.sign(
                {
                    username: body.username,
                    userId: user.id,
                    dailyGoal: user.dailyGoal ?? 0,
                },
                process.env.SECRET_KEY ?? "",
                {
                    expiresIn: "7d",
                }
            );

            return NextResponse.json({token});
        }

        return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    } catch (error) {
        return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }
}
