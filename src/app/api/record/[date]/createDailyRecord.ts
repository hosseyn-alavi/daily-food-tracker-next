import type {Params, TokenValues} from "@/lib/validateJWT";
import {DailyRecord} from "@/models/DailyRecord";
import {type NextRequest, NextResponse} from "next/server";

export async function createDailyRecord(
    req: NextRequest,
    {params}: Params,
    {userId}: TokenValues
) {
    const {date} = params;

    const body = await req.json();
    const record = await DailyRecord.create({
        ...body,
        userId,
        date,
    });
    if (!record) {
        return NextResponse.json(
            {
                message: "Failed to create record",
            },
            {status: 400}
        );
    }
    return NextResponse.json({
        message: "Record added successfully",
        record,
    });
}
