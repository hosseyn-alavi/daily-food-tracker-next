import {withAuth} from "@/lib/validateJWT";
import {getFoods} from "./getFoods";
import {createFood} from "./createFood";

export const GET = withAuth(getFoods);

export const POST = withAuth(createFood);
