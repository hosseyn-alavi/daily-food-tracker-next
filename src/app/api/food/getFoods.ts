import {Food} from "@/models/Food";
import {NextResponse} from "next/server";

export async function getFoods() {
    const foods = await Food.findAll();

    return NextResponse.json(foods);
}
