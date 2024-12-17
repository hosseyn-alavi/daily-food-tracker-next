import type {Params} from "@/lib/validateJWT";
import {DailyRecord} from "@/models/DailyRecord";
import {type NextRequest, NextResponse} from "next/server";

export async function deleteDailyRecord(req: NextRequest, {params}: Params) {
    const {id} = params;
    const record = await DailyRecord.findByPk(id);
    if (!record) {
        return NextResponse.json({error: "Record not found"}, {status: 404});
    }
    await record.destroy();
    return NextResponse.json({message: "Record deleted"});
}
