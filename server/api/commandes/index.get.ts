export default defineEventHandler(async (event) => {
  try {
    const commandes = [
      {
        "id": 1,
        "restaurantId": 1,
        "items": [
          {
            "id": 1,
            "name": "Menu Dégustation Végétal",
            "price": 195,
            "quantity": 1
          },
          {
            "id": 2,
            "name": "Omble Chevalier du Lac",
            "price": 48,
            "quantity": 2
          }
        ],
        "total": 291.00,
        "date": "2025-10-27T10:30:00.000Z",
        "status": "pending"
      },
      {
        "id": 2,
        "restaurantId": 2,
        "items": [
          {
            "id": 5,
            "name": "Menu Alpage",
            "price": 165,
            "quantity": 1
          },
          {
            "id": 6,
            "name": "Agneau des Bauges",
            "price": 42,
            "quantity": 1
          }
        ],
        "total": 207.00,
        "date": "2025-10-27T11:15:00.000Z",
        "status": "confirmed"
      },
      {
        "id": 3,
        "restaurantId": 1,
        "items": [
          {
            "id": 3,
            "name": "Légumes du Potager",
            "price": 35,
            "quantity": 2
          }
        ],
        "total": 70.00,
        "date": "2025-10-27T12:00:00.000Z",
        "status": "ready"
      }
    ]
    
    // Récupérer l'ID du restaurant depuis les paramètres de requête
    const query = getQuery(event)
    const restaurantId = query.restaurantId
    
    if (restaurantId) {
      // Filtrer par restaurant si spécifié
      const filteredCommandes = commandes.filter((commande: any) => commande.restaurantId === parseInt(restaurantId as string))
      return filteredCommandes
    }
    
    return commandes
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des commandes'
    })
  }
})