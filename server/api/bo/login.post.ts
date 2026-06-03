export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    return { error: 'Identifiants invalides' }
  }

  try {
    const response = await $fetch<{ accessToken: string; refreshToken: string; user: any }>(`${config.apiBaseUrl}/api/auth/login`, {
      method: 'POST',
      body: { email, password },
    })

    if (response.user.role !== 'ADMIN' && response.user.role !== 'RESTAURANT') {
      return { error: 'Accès refusé : rôle insuffisant' }
    }

    return {
      user: { ...response.user, token: response.accessToken, refreshToken: response.refreshToken },
    }
  } catch {
    return { error: 'Identifiants invalides' }
  }
})
