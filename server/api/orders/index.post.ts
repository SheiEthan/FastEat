export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const authHeader = getHeader(event, "authorization");
    const body = await readBody(event);
    const { restaurantId, deliveryAddress, deliveryCity, items, notes } = body;

    if (!restaurantId || !deliveryAddress || !deliveryCity || !items) {
        throw createError({
            statusCode: 400,
            statusMessage: "Champs manquants",
        });
    }

    try {
        return await $fetch(`${config.apiBaseUrl}/api/orders`, {
            method: "POST",
            headers: authHeader ? { Authorization: authHeader } : {},
            body: {
                restaurantId,
                deliveryAddress,
                deliveryCity,
                items,
                ...(notes ? { notes } : {}),
            },
        });
    } catch (e: any) {
        throw createError({
            statusCode: e.statusCode || 500,
            statusMessage:
                e.data?.detail ||
                e.data?.message ||
                "Erreur lors de la commande",
        });
    }
});
