<template>
    <div class="page-orders">
        <div class="container">
            <h1>📦 {{ $t("my_orders") }}</h1>

            <div v-if="orderStore.orders.length === 0" class="no-orders">
                <p>{{ $t("no_orders") }}</p>
                <NuxtLink to="/restaurants" class="btn btn-primary">
                    {{ $t("discover_restaurants_btn") }}
                </NuxtLink>
            </div>

            <div v-else class="orders-list">
                <div
                    v-for="order in orderStore.getAllOrders"
                    :key="order.id"
                    class="order-card"
                >
                    <div class="order-header">
                        <h3>Commande #{{ order.id.slice(0, 8) }}</h3>
                        <span class="order-date">{{
                            new Date(order.createdAt).toLocaleDateString(
                                "fr-FR",
                                {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                },
                            )
                        }}</span>
                        <span class="total-price"
                            >{{ order.totalPrice.toFixed(2) }}€</span
                        >
                        <span
                            class="order-status"
                            :class="order.status.toLowerCase()"
                            >{{ order.status }}</span
                        >
                    </div>
                    <div class="order-items">
                        <div
                            v-for="item in order.items"
                            :key="item.id"
                            class="order-item"
                        >
                            <img
                                v-if="item.dishImage"
                                :src="item.dishImage"
                                :alt="item.dishName ?? ''"
                                class="item-image"
                            />
                            <div class="item-details">
                                <span class="item-name">
                                    {{ item.dishName ?? item.dishId.slice(0, 8) }}
                                    <span class="text-success">x{{ item.quantity }}</span>
                                </span>
                                <span class="item-price">{{ item.subtotal }}€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useOrderStore } from "~/stores/orders/orderStore";
import { useSeoMeta } from "nuxt/app";

const orderStore = useOrderStore();

onMounted(async () => {
    await orderStore.fetchOrders();
});

useSeoMeta({
    title: "Mes Commandes - FastEat",
    description: "Consultez l’historique de vos commandes sur FastEat.",
    ogTitle: "Mes Commandes - FastEat",
    ogDescription: "Consultez l’historique de vos commandes sur FastEat.",
    ogType: "website",
});

definePageMeta({ SSR: false });
</script>
