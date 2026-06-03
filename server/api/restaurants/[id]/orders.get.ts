import type { PaginatedOrders } from "~/modules/order/types";

export default defineEventHandler(async (event): Promise<PaginatedOrders> => {
    const config = useRuntimeConfig();
    const id = getRouterParam(event, "id");
    const authHeader = getHeader(event, "authorization");
    const headers: Record<string, string> = authHeader
        ? { Authorization: authHeader }
        : {};
    const baseUrl: string = config.apiBaseUrl;
    const query = getQuery(event);

    try {
        return await $fetch<PaginatedOrders>(
            baseUrl + `/api/orders/restaurants/${id}/orders`,
            { headers, query },
        );
    } catch (e: any) {
        throw createError({
            statusCode: e.statusCode || 500,
            statusMessage: e.data?.detail || e.message || "Error",
        });
    }
});
