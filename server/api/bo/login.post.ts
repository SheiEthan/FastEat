import { readBody } from 'h3'
import { readFile } from 'fs/promises'
import { join } from 'path'
import type { User } from '~/app/modules/user/types/index'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // Charger les utilisateurs
  const usersPath = join(process.cwd(), 'server/data/users.json')
  const users: User[] = JSON.parse(await readFile(usersPath, 'utf-8'))

  // Vérifier l'utilisateur
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) {
    return { error: 'Identifiants invalides' }
  }

  // Ne jamais renvoyer le mot de passe !
  const { password: _, ...userSafe } = user
  return { user: userSafe }
})
