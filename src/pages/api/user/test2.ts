import {User} from "@/models/User";
import type {NextApiRequest, NextApiResponse} from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const user = await User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password,
        },
    });

    res.status(200).json(user);
}
