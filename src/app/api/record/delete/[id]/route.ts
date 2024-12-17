import {withAuth} from "@/lib/validateJWT";
import {deleteDailyRecord} from "./deleteDailyRecord";

export const DELETE = withAuth(deleteDailyRecord);
