import {Food} from "@/models/Food";
import {type NextRequest, NextResponse} from "next/server";

export async function createFood(req: NextRequest) {
    const body = await req.json();
    const food = await Food.create(body);

    return NextResponse.json(food);
}
