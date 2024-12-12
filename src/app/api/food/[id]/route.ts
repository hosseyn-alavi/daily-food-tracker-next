import {authorizeApi} from "@/lib/validateJWT";
import {Food} from "@/models/Food";
import {NextResponse, type NextRequest} from "next/server";

export async function DELETE(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    authorizeApi(req);

    const {id} = params;
    try {
        const food = await Food.destroy({where: {id}});
        if (food) {
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
