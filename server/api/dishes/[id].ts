import type { Dish } from '~/modules/dish/types'

export default defineEventHandler(async (event): Promise<Dish | null> => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const method = getMethod(event)
  const authHeader = getHeader(event, 'authorization')
  const headers: Record<string, string> = authHeader ? { Authorization: authHeader } : {}

  try {
    if (method === 'PATCH') {
      const body = await readBody(event)
      const { restaurantId, ...dishData } = body
      return await $fetch<Dish>(`${config.apiBaseUrl}/api/restaurants/${restaurantId}/dishes/${id}`, {
        method: 'PATCH',
        headers,
        body: dishData,
      })
    }
    if (method === 'DELETE') {
      const query = getQuery(event)
      const restaurantId = query.restaurantId as string
      await $fetch(`${config.apiBaseUrl}/api/restaurants/${restaurantId}/dishes/${id}`, {
        method: 'DELETE',
        headers,
      })
      return null
    }
    return await $fetch<Dish>(`${config.apiBaseUrl}/api/dishes/${id}`)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Dish not found' })
  }
})
