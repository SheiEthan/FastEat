export type Dish = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  restaurantId: number;
  quantity?: number;
};