import {Home} from "./Home";
import {cookies} from "next/headers";
import {getDailyRecordsServer} from "@/lib/api/getDailyRecord";
import {getFoodsListServer} from "@/lib/api/getFoodList";

async function HomeWrapper() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const foods = await getFoodsListServer(token);
    const initialDailyRecords = await getDailyRecordsServer(token);

    return <Home foods={foods} initialDailyRecords={initialDailyRecords} />;
}

export default HomeWrapper;
