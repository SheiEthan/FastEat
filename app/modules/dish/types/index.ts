export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  restaurantId: string;
  quantity?: number;
};