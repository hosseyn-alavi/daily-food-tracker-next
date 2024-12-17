import {withAuth} from "@/lib/validateJWT";
import {getDailyRecords} from "./getDailyRecords";
import {createDailyRecord} from "./createDailyRecord";

export const GET = withAuth(getDailyRecords);

export const POST = withAuth(createDailyRecord);
