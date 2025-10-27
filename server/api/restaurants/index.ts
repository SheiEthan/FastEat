import restaurants from "../../data/restaurant.json";
import type { Restaurant } from "~/modules/restaurant/types";

export default defineEventHandler((event) => {
  return restaurants as Restaurant[];
});
