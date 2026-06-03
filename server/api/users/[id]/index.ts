export default defineEventHandler(async (event): Promise<unknown> => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const method = getMethod(event)
  const authHeader = getHeader(event, 'authorization')
  const headers: Record<string, string> = authHeader ? { Authorization: authHeader } : {}
  const baseUrl: string = config.apiBaseUrl

  try {
    if (method === 'DELETE') {
      return await $fetch<unknown>(baseUrl + `/api/users/${id}`, { method: 'DELETE', headers })
    }
    if (method === 'PUT' || method === 'PATCH') {
      const body = await readBody(event)
      return await $fetch<unknown>(baseUrl + `/api/users/${id}`, { method, headers, body })
    }
    return await $fetch<unknown>(baseUrl + `/api/users/${id}`, { headers })
  } catch (e: any) {
    throw createError({ statusCode: e.statusCode || e.response?.status || 500, statusMessage: e.data?.message || e.message || 'Error' })
  }
})
