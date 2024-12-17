import type {Params, TokenValues} from "@/lib/validateJWT";
import {DailyRecord} from "@/models/DailyRecord";
import {NextResponse, type NextRequest} from "next/server";

export async function getDailyRecords(
    req: NextRequest,
    {params}: Params,
    {dailyGoal, userId}: TokenValues
) {
    const {date} = params;

    const records = await DailyRecord.findAll({
        where: {date, userId},
    });

    return NextResponse.json({records, dailyGoal});
}
