import {User} from "@/models/User";
import jwt from "jsonwebtoken";
import {NextApiRequest, NextApiResponse} from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    methodHelper(req, res, "POST");

    const user = await User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password,
        },
    });
    console.log("user:", user);

    if (user) {
        // Generate JWT token
        const token = jwt.sign(
            {
                username: req.body.username,
                userId: user.id,
                dailyGoal: user.dailyGoal ?? 0,
            },
            process.env.SECRET_KEY ?? "",
            {
                expiresIn: "7d",
            }
        );

        res.json({token});
    } else {
        res.status(401).json({error: "Invalid credentials"});
    }
}

export function methodHelper(
    req: NextApiRequest,
    res: NextApiResponse,
    method: string
) {
    if (req.method !== method) {
        res.setHeader("Allow", [method]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
