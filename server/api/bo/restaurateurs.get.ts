import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Charger les utilisateurs depuis users.json
    const usersPath = join(process.cwd(), 'server/data/users.json')
    const users = JSON.parse(await readFile(usersPath, 'utf-8'))

    // Filtrer seulement les restaurateurs (pas les admins)
    const restaurateurs = users.filter(user => user.role === 'restaurateur')

    return { restaurateurs }
  } catch (error) {
    return { error: 'Erreur lors du chargement des restaurateurs', restaurateurs: [] }
  }
})