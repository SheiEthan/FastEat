import type { Dish } from '~/modules/dish/types'

export type Commande = {
  id: number
  restaurantId: number
  items: Dish[]
  total: number
  date: string
  status: 'pending' | 'confirmed' | 'ready' | 'delivered'
}