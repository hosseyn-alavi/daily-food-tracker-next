export async function GET(request: Request) {
    return new Response(`Hello, world! ${request.method}`, {
        status: 200,
    });
}
