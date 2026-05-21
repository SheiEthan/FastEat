export default defineEventHandler(async (event): Promise<unknown> => {
  const config = useRuntimeConfig()
  const method = getMethod(event)
  const authHeader = getHeader(event, 'authorization')
  const headers: Record<string, string> = authHeader ? { Authorization: authHeader } : {}
  const baseUrl: string = config.apiBaseUrl

  if (method === 'POST') {
    const body = await readBody(event)
    return await $fetch<unknown>(baseUrl + '/api/restaurants', { method: 'POST', headers, body })
  }

  const response = await $fetch<{ data: any[] }>(baseUrl + '/api/restaurants')
  return response.data ?? []
})
