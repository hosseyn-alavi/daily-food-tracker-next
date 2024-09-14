import {User} from "@/models/User";
import jwt from "jsonwebtoken";
import {NextApiRequest, NextApiResponse} from "next";

export async function login(req: NextApiRequest, res: NextApiResponse) {
    const user = await User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password,
        },
    });

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
