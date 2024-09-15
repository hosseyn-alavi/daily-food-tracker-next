import type {NextApiRequest} from "next";

export async function GET(request: NextApiRequest) {
    return new Response(`Hello, world! ${request.method}`, {
        status: 200,
    });
}
