import { readBody } from 'h3'
import { users } from '../../data/users'
import type { User } from '~/app/modules/user/types/index'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // Vérifier l'utilisateur
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) {
    return { error: 'Identifiants invalides' }
  }

  // Ne jamais renvoyer le mot de passe !
  const { password: _, ...userSafe } = user
  return { user: userSafe }
})
