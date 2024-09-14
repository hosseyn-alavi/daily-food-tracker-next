import type {NextApiRequest, NextApiResponse} from "next";
import {methodHelper} from "./login";

export default function login(req: NextApiRequest, res: NextApiResponse) {
    methodHelper(req, res, "POST");
    res.status(200).json({name: "John Doe2"});
}
