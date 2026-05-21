export default defineEventHandler(async (event): Promise<unknown> => {
  const config = useRuntimeConfig()
  const authHeader = getHeader(event, 'authorization')
  const headers: Record<string, string> = authHeader ? { Authorization: authHeader } : {}
  const baseUrl: string = config.apiBaseUrl

  return await $fetch<unknown>(baseUrl + '/api/users', { headers })
})
