export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { firstName, lastName, email, password, role } = body

  if (!firstName || !lastName || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Tous les champs sont requis' })
  }

  try {
    const response = await $fetch<{ token: string; user: any }>(`${config.apiBaseUrl}/api/auth/register`, {
      method: 'POST',
      body: { email, password, firstName, lastName, ...(role ? { role } : {}) },
    })
    return {
      user: { ...response.user, token: response.token },
      message: 'Inscription réussie',
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 409,
      statusMessage: e.data?.detail || "Erreur lors de l'inscription",
    })
  }
})
