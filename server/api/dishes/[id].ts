import dishes from "../../data/dishes.json";
import type { Dish } from "~/modules/dish/types";

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  
  const dish = dishes.find((d: Dish) => d.id === id);
  
  if (!dish) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Dish not found'
    });
  }
  
  return dish as Dish;
});