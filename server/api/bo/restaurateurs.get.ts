import { users } from '../../data/users'

export default defineEventHandler(async (event) => {
  // Filtrer seulement les restaurateurs (pas les admins)
  const restaurateurs = users.filter(user => user.role === 'restaurateur')
  return { restaurateurs }
})