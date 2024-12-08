import {Food} from "@/models/Food";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const foods = await Food.findAll();

        return NextResponse.json(foods);
    } catch {
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const food = await Food.create(body);
        if (food) {
            NextResponse.json(food);
        }
    } catch {
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}
