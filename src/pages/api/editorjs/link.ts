import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
        return new Response(JSON.stringify({ success: 0, message: "Missing url parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const mockMeta = {
        success: 1,
        meta: {
            title: targetUrl,
            description: `Open Graph preview for ${targetUrl}`,
            image: undefined,
        },
    };

    return new Response(JSON.stringify(mockMeta), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
