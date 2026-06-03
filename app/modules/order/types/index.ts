export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'

export interface OrderItem {
  id: string
  dishId: string
  dishName: string | null
  dishImage: string | null
  quantity: number
  unitPrice: number
  subtotal: number
  specialInstructions?: string
}

export interface Order {
  id: string
  totalPrice: number
  status: OrderStatus
  deliveryAddress: string
  deliveryCity: string
  notes?: string
  estimatedTime?: number
  userId: string
  restaurantId: string
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface PaginatedOrders {
  data: Order[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}
