import restaurants from "../../data/restaurant.json";
import type { Restaurant } from "~/modules/restaurant/types";

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'));
  
  const foundRestaurant = (restaurants as Restaurant[])?.find?.(
    (restaurant) => restaurant.id === id
  );
  
  if (!foundRestaurant) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Restaurant not found'
    });
  }

  return foundRestaurant;
});