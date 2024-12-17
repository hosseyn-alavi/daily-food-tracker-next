import {withAuth} from "@/lib/validateJWT";
import { deleteFood } from "./deleteFood";

export const DELETE = withAuth(deleteFood)
