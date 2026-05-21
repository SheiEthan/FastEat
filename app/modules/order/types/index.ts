import type { Dish } from '~/modules/dish/types'

export interface Order {
  id: string
  date: string
  items: Dish[]
  total: number
}