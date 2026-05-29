import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const image = formData.get("image");

        const mockResponse = {
            success: 1,
            file: {
                id: "stub-" + Date.now(),
                name: image instanceof File ? image.name : "unknown",
                url: "/img/placeholder.png",
                size: image instanceof File ? image.size : 0,
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
