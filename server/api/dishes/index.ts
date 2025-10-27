import dishes from "../../data/dishes.json";
import type { Dish } from "~/modules/dish/types";

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const restaurantId = query.restaurantId
  
  if (restaurantId) {
    // Filtrer par restaurant si spécifié
    const filteredDishes = dishes.filter((dish: Dish) => dish.restaurantId === parseInt(restaurantId as string))
    return filteredDishes as Dish[]
  }
  
  return dishes as Dish[];
});
