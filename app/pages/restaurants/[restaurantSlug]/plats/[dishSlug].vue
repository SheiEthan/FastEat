<template>
  <div class="dish-page bg-light min-vh-100">
    <!-- Breadcrumb navigation -->
    <div class="bg-white border-bottom">
      <div class="container">
        <nav aria-label="breadcrumb" class="py-3">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <NuxtLink to="/restaurants" class="text-decoration-none">
                <i class="bi bi-house me-1"></i> Restaurants
              </NuxtLink>
            </li>
            <li class="breadcrumb-item">
              <NuxtLink :to="`/restaurants/${restaurantSlugComputed}`" class="text-decoration-none">
                {{ restaurant?.name }}
              </NuxtLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ dish?.name }}</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Dish details section -->
    <div class="bg-white py-5">
      <div class="container">
        <div class="row align-items-center g-4">
          <!-- Image du plat -->
          <div class="col-lg-6">
            <div class="position-relative">
              <img class="img-fluid rounded-3 shadow-lg dish-image" :src="dish?.image" :alt="dish?.name" />
              <span class="position-absolute top-0 start-0 m-3 badge bg-light text-dark">{{ dish?.category }}</span>
            </div>
          </div>
          
          <!-- Informations du plat -->
          <div class="col-lg-6">
            <div class="ps-lg-4">
              <div class="mb-3">
                <h1 class="display-4 fw-bold text-dark mb-2">{{ dish?.name }}</h1>
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="text-warning">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-half"></i>
                  </div>
                  <small class="text-muted">4.5 (127 avis)</small>
                </div>
              </div>
              
              <p class="lead text-muted mb-4">{{ dish?.description }}</p>
              
              <div class="row g-2 mb-4">
                <div class="col-auto">
                  <span class="badge bg-success-subtle text-success border border-success-subtle">
                    <i class="bi bi-clock me-1"></i>15-20 min
                  </span>
                </div>
                <div class="col-auto">
                  <span class="badge bg-warning-subtle text-warning border border-warning-subtle">
                    <i class="bi bi-fire me-1"></i>350 kcal
                  </span>
                </div>
                <div class="col-auto">
                  <span class="badge bg-primary-subtle text-primary border border-primary-subtle">
                    <i class="bi bi-award me-1"></i>Recommandé
                  </span>
                </div>
              </div>
              
              <div class="mb-4">
                <span class="h2 text-danger fw-bold mb-0">{{ dish?.price }}€</span>
              </div>

              <div class="d-flex align-items-center gap-3 mb-4">
                <label for="quantity" class="form-label mb-0">Quantité :</label>
                <div class="quantity-controls">
                  <button @click="decrementQuantity" :disabled="quantity <= 1" class="btn btn-outline-success rounded-circle" style="width:32px;height:32px;">−</button>
                  <span class="mx-2 fw-bold">{{ quantity }}</span>
                  <button @click="incrementQuantity" class="btn btn-success rounded-circle" style="width:32px;height:32px;">+</button>
                </div>
              </div>
              
              <div class="d-flex gap-3 mb-3">
                <button class="btn btn-success btn-lg rounded-pill px-4" @click="addToCart">
                  <i class="bi bi-cart-plus me-2"></i>
                  Ajouter au panier
                </button>
                <button class="btn btn-outline-danger rounded-circle" style="width: 48px; height: 48px;">
                  <i class="bi bi-heart"></i>
                </button>
              </div>
              <ToastNotification :message="toastMessage" :visible="showToast" />
              
              <NuxtLink :to="`/restaurants/${restaurantSlugComputed}`" class="text-muted text-decoration-none">
                <i class="bi bi-arrow-left me-1"></i> Retour au restaurant
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Restaurant info section -->
    <div class="py-4">
      <div class="container">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
              <div class="d-flex align-items-center gap-3">
                <img :src="restaurant?.image" :alt="restaurant?.name" 
                     class="rounded-circle border border-3 border-light shadow-sm" 
                     style="width: 80px; height: 80px; object-fit: cover;" />
                <div>
                  <h5 class="card-title mb-1">{{ restaurant?.name }}</h5>
                  <p class="card-text text-muted small mb-2">{{ restaurant?.description }}</p>
                  <div class="d-flex flex-column gap-1">
                    <span class="text-muted small">
                      <i class="bi bi-geo-alt text-success me-1"></i>
                      {{ restaurant?.city }}
                    </span>
                    <span class="text-muted small">
                      <i class="bi bi-star-fill text-warning me-1"></i>
                      4.5 (234 avis)
                    </span>
                  </div>
                </div>
              </div>
              <NuxtLink :to="`/restaurants/${restaurantSlugComputed}`" class="btn btn-primary">
                Voir le restaurant
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dish } from "~/modules/dish/types";
import type { Restaurant } from "~/modules/restaurant/types";
import { useCartListStore } from "~/stores/cart/cartListStore";
import { useDishStore } from '~/stores/dish/dishStore'
import { extractIdFromSlug, createRestaurantSlug } from "~/utils/slugs";
import ToastNotification from '@/components/ToastNotification.vue'

const route = useRoute();
const router = useRouter();
const cartListStore = useCartListStore();

const restaurantSlug = route.params.restaurantSlug as string;
const dishSlug = route.params.dishSlug as string;
const restaurant_id: number = extractIdFromSlug(restaurantSlug);
const dish_id: number = extractIdFromSlug(dishSlug);

// Récupérer les données du restaurant
const { data: restaurant } = await useAsyncData("restaurant", () =>
  $fetch<Restaurant>(`/api/restaurants/${restaurant_id}`)
);

// Récupérer les données du plat
const dishStore = useDishStore()
const { data: dish } = await useAsyncData("dish", () => $fetch(`/api/dishes/${dish_id}`))
dishStore.selectDish(dish.value)

// Vérifier que le plat appartient bien à ce restaurant
if (!dish.value || !restaurant.value) {
  throw createError({
    statusCode: 404,
  });
}

if (dish.value.restaurantId !== restaurant_id) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Ce plat ne fait pas partie de ce restaurant'
  });
}

const quantity = ref(1);
const incrementQuantity = () => { quantity.value++ }
const decrementQuantity = () => { if (quantity.value > 1) quantity.value-- }

const showToast = ref(false);
const toastMessage = ref("");

const addToCart = () => {
  if (dish.value) {
    cartListStore.addDish({ ...dish.value, quantity: quantity.value });
    toastMessage.value = `${quantity.value} x "${dish.value.name}" ajouté au panier !`;
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 5000);
  }
};

// Computed pour générer le slug du restaurant
const restaurantSlugComputed = computed(() => {
  if (!restaurant.value) return '';
  return createRestaurantSlug(restaurant.value);
});
</script>

<style scoped>
/* Styles custom minimaux - Bootstrap fait le reste ! */
.dish-image {
  height: 400px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.dish-image:hover {
  transform: scale(1.02);
}

/* Effet hover sur les boutons (en plus de Bootstrap) */
.btn:hover {
  transform: translateY(-1px);
}

.card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style>