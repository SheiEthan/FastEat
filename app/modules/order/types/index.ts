import type { Dish } from '~/modules/dish/types'

export interface Order {
  id: number
  date: string
  items: Dish[]
  total: number
}