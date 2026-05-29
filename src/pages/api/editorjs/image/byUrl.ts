import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { url } = body;

        const mockResponse = {
            success: 1,
            file: {
                id: "stub-" + Date.now(),
                name: url ? url.split("/").pop() || "image" : "image",
                url: url || "/img/placeholder.png",
                size: 0,
            },
        };

        return new Response(JSON.stringify(mockResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        return new Response(JSON.stringify({ success: 0, message: (e as Error).message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
