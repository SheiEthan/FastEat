export interface User {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'restaurateur';
  nom: string;
  prenom: string;
  restaurantId: number;
}
