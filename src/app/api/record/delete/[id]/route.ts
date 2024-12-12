import {authorizeApi} from "@/lib/validateJWT";
import {DailyRecord} from "@/models/DailyRecord";
import {NextResponse, type NextRequest} from "next/server";

export async function DELETE(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    const {id} = params;
    authorizeApi(req);
    try {
        const rec = await DailyRecord.destroy({where: {id}});
        if (rec) {
            return NextResponse.json({message: "Successfully deleted"});
        }
        return NextResponse.json({error: "Record not found"}, {status: 401});
    } catch {
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}
