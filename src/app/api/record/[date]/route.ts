import {authorizeApi} from "@/lib/validateJWT";
import {DailyRecord} from "@/models/DailyRecord";
import {type NextRequest, NextResponse} from "next/server";

export async function GET(
    req: NextRequest,
    {params}: {params: {date: string}}
) {
    const {date} = params;
    const {dailyGoal} = authorizeApi(req);

    try {
        // Example: Query database with date
        const records = await DailyRecord.findAll({
            where: {date},
        });

        return NextResponse.json({records, dailyGoal});
    } catch (error) {
        console.error("Error fetching records:", error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}

export async function POST(
    req: NextRequest,
    {params}: {params: {date: string}}
) {
    const {userId} = authorizeApi(req);
    const {date} = params;

    try {
        const body = await req.json();
        const record = await DailyRecord.create({
            ...body,
            userId,
            date,
        });
        if (record) {
            return NextResponse.json({
                message: "Record added successfully",
                record,
            });
        }
    } catch {
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}
