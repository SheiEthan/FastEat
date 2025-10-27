export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { prenom, nom, email, password } = body

  if (!prenom || !nom || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tous les champs sont requis'
    })
  }

  // Lire la liste des utilisateurs clients
  const users = await $fetch('/api/client/users') as any[]
  
  // Vérifier si l'utilisateur existe déjà
  const existingUser = users.find((u: any) => u.email === email)
  
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Un utilisateur avec cet email existe déjà'
    })
  }

  // Créer le nouvel utilisateur avec une structure complète
  const newUser = {
    id: Math.max(...users.map(u => u.id), 0) + 1,
    prenom,
    nom,
    email,
    password, // En production, il faudrait hasher le mot de passe
    telephone: "", // À remplir plus tard dans le profil
    adresse: {
      rue: "",
      codePostal: "",
      ville: ""
    },
    dateInscription: new Date().toISOString(),
    commandes: []
  }

  // TODO: En production, sauvegarder le nouvel utilisateur dans la base de données
  // Pour l'instant on simule un succès
  
  // Retourner l'utilisateur sans le mot de passe
  const { password: _, ...userWithoutPassword } = newUser
  
  return {
    user: userWithoutPassword,
    message: 'Inscription réussie'
  }
})