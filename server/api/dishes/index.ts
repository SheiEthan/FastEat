import type { Dish } from '~/modules/dish/types'

export default defineEventHandler(async (event): Promise<Dish | Dish[]> => {
  const config = useRuntimeConfig()
  const method = getMethod(event)
  const authHeader = getHeader(event, 'authorization')
  const headers: Record<string, string> = authHeader ? { Authorization: authHeader } : {}

  if (method === 'POST') {
    const body = await readBody(event)
    const { restaurantId, ...dishData } = body
    return await $fetch<Dish>(`${config.apiBaseUrl}/api/restaurants/${restaurantId}/dishes`, {
      method: 'POST',
      headers,
      body: dishData,
    })
  }

  const query = getQuery(event)
  const restaurantId = query.restaurantId as string | undefined
  const url = restaurantId
    ? `${config.apiBaseUrl}/api/dishes?restaurantId=${restaurantId}`
    : `${config.apiBaseUrl}/api/dishes`
  return await $fetch<Dish[]>(url)
})
