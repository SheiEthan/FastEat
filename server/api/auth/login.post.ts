export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email et mot de passe requis' })
  }

  try {
    const response = await $fetch<{ accessToken: string; refreshToken: string; user: any }>(`${config.apiBaseUrl}/api/auth/login`, {
      method: 'POST',
      body: { email, password },
    })
    return {
      user: { ...response.user, token: response.accessToken, refreshToken: response.refreshToken },
      message: 'Connexion réussie',
    }
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 401,
      statusMessage: e.data?.detail || 'Email ou mot de passe incorrect',
    })
  }
})
