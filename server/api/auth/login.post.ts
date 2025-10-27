export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email et mot de passe requis'
    })
  }

  // Lire le fichier des utilisateurs clients
  const users = await $fetch('/api/client/users') as any[]
  
  // Chercher l'utilisateur
  const user = users.find((u: any) => u.email === email && u.password === password)
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Email ou mot de passe incorrect'
    })
  }

  // Retourner l'utilisateur sans le mot de passe
  const { password: _, ...userWithoutPassword } = user
  
  return {
    user: userWithoutPassword,
    message: 'Connexion réussie'
  }
})