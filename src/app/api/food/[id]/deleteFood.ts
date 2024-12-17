import { Food } from "@/models/Food";
import { NextResponse, type NextRequest } from "next/server";

export async function deleteFood(req: NextRequest,
    { params }: { params: { id: string } }) {
    const { id } = params;

    const food = await Food.destroy({ where: { id } });
    if (food) {
        return NextResponse.json({ message: "Successfully deleted" });
    }
    return NextResponse.json({ error: "Record not found" }, { status: 401 });
}