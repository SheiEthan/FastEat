import type { Order } from '~/modules/order/types'

export default defineEventHandler(async (event): Promise<Order> => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const authHeader = getHeader(event, 'authorization')
  const headers: Record<string, string> = authHeader ? { Authorization: authHeader } : {}
  const baseUrl: string = config.apiBaseUrl
  const body = await readBody(event)

  return await $fetch<Order>(baseUrl + `/api/orders/${id}/status`, { method: 'PATCH', headers, body })
})
