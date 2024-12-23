import {cookies} from "next/headers";
import {Foods} from "./Foods";
import {getFoodsListServer} from "@/lib/api/getFoodList";

async function FoodsPage() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const foods = await getFoodsListServer(token);

    return <Foods foods={foods} />;
}

export default FoodsPage;
