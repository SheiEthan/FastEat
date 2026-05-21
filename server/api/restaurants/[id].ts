import type { Restaurant } from '~/modules/restaurant/types'

export default defineEventHandler(async (event): Promise<Restaurant> => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const method = getMethod(event)
  const authHeader = getHeader(event, 'authorization')
  const headers: Record<string, string> = authHeader ? { Authorization: authHeader } : {}

  try {
    if (method === 'PATCH') {
      const body = await readBody(event)
      return await $fetch<Restaurant>(`${config.apiBaseUrl}/api/restaurants/${id}`, {
        method: 'PATCH',
        headers,
        body,
      })
    }
    return await $fetch<Restaurant>(`${config.apiBaseUrl}/api/restaurants/${id}`, { headers })
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Restaurant not found' })
  }
})
