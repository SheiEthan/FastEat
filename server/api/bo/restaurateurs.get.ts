export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const authCookie = getCookie(event, 'bo-auth')
  if (!authCookie) {
    throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })
  }

  const boUser = JSON.parse(authCookie)
  if (boUser.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Accès réservé aux admins' })
  }

  const users = await $fetch<any[]>(`${config.apiBaseUrl}/api/users`, {
    headers: { Authorization: `Bearer ${boUser.token}` },
  })

  const restaurateurs = users.filter((u: any) => u.role === 'RESTAURANT')
  return { restaurateurs }
})
