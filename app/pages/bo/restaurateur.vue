<template>
  <div class="bo-restaurateur-layout">
    <!-- Menu latéral gauche -->
    <aside class="bo-sidebar">
      <div class="bo-logo">
        <h3>🍽️ Restaurateur</h3>
        <p class="restaurant-name">{{ userRestaurant?.name || 'Mon Restaurant' }}</p>
      </div>
      <nav class="bo-nav">
        <ul>
          <li :class="{ active: currentPage === 'restaurant' }">
            <a href="#" @click.prevent="currentPage = 'restaurant'">
              <i class="icon">🏪</i>
              <span>Mon Restaurant</span>
            </a>
          </li>
          <li :class="{ active: currentPage === 'plats' }">
            <a href="#" @click.prevent="currentPage = 'plats'">
              <i class="icon">🍕</i>
              <span>Mes Plats</span>
            </a>
          </li>
          <li :class="{ active: currentPage === 'commandes' }">
            <a href="#" @click.prevent="currentPage = 'commandes'">
              <i class="icon">📦</i>
              <span>Commandes</span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="logout" class="logout-btn">
              <i class="icon">🚪</i>
              <span>Déconnexion</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Contenu principal -->
    <main class="bo-main">
      <!-- Header -->
      <header class="bo-header">
        <h1>
          <span v-if="currentPage === 'restaurant'">🏪 Gestion Restaurant</span>
          <span v-else-if="currentPage === 'plats'">🍕 Gestion des Plats</span>
          <span v-else-if="currentPage === 'commandes'">📦 Commandes Reçues</span>
        </h1>
        <div class="user-info">
          <span>{{ currentUser?.prenom }} {{ currentUser?.nom }}</span>
        </div>
      </header>

      <!-- Page Restaurant -->
      <div v-if="currentPage === 'restaurant'" class="bo-content">
        <div class="section-header">
          <h2>Informations du Restaurant</h2>
          <button @click="editRestaurant = !editRestaurant" class="btn btn-primary">
            {{ editRestaurant ? 'Annuler' : 'Modifier' }}
          </button>
        </div>

        <div class="restaurant-card">
          <div v-if="!editRestaurant" class="restaurant-info">
            <div class="info-row">
              <label>Nom du Restaurant :</label>
              <span>{{ restaurantForm.name || 'Nom non défini' }}</span>
            </div>
            <div class="info-row">
              <label>Adresse :</label>
              <span>{{ restaurantForm.street || 'Rue non définie' }}</span>
            </div>
            <div class="info-row">
              <label>Code Postal :</label>
              <span>{{ restaurantForm.postalCode || 'Code postal non défini' }}</span>
            </div>
            <div class="info-row">
              <label>Ville :</label>
              <span>{{ restaurantForm.city || 'Ville non définie' }}</span>
            </div>
          </div>

          <form v-else @submit.prevent="saveRestaurant" class="restaurant-form">
            <div class="form-group">
              <label>Nom du Restaurant :</label>
              <input v-model="restaurantForm.name" type="text" required>
            </div>
            <div class="form-group">
              <label>Rue :</label>
              <input v-model="restaurantForm.street" type="text" placeholder="123 rue de la Paix">
            </div>
            <div class="form-group">
              <label>Code Postal :</label>
              <input v-model="restaurantForm.postalCode" type="text" placeholder="75001">
            </div>
            <div class="form-group">
              <label>Ville :</label>
              <input v-model="restaurantForm.city" type="text" placeholder="Paris">
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-success">Sauvegarder</button>
              <button type="button" @click="editRestaurant = false" class="btn btn-secondary">Annuler</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Page Plats -->
      <div v-if="currentPage === 'plats'" class="bo-content">
        <div class="section-header">
          <h2>Mes Plats</h2>
          <button @click="showAddPlat = !showAddPlat" class="btn btn-primary">
            {{ showAddPlat ? 'Annuler' : 'Ajouter un Plat' }}
          </button>
        </div>

        <!-- Formulaire d'ajout de plat -->
        <div v-if="showAddPlat" class="restaurant-card">
          <h3>{{ showEditPlat ? 'Modifier le Plat' : 'Ajouter un nouveau Plat' }}</h3>
          <form @submit.prevent="savePlat" class="restaurant-form">
            <div class="form-group">
              <label>Nom du Plat :</label>
              <input v-model="platForm.name" type="text" required>
            </div>
            <div class="form-group">
              <label>Photo (URL) :</label>
              <input v-model="platForm.image" type="url" placeholder="https://exemple.com/image.jpg">
            </div>
            <div class="form-group">
              <label>Prix Unitaire :</label>
              <input v-model="platForm.price" type="number" step="0.01" required>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-success">{{ showEditPlat ? 'Modifier' : 'Ajouter' }}</button>
              <button type="button" @click="closeModal" class="btn btn-secondary">Annuler</button>
            </div>
          </form>
        </div>

        <div class="plats-grid">
          <div v-for="plat in restaurantPlats" :key="plat.id" class="plat-card">
            <img :src="plat.image" :alt="plat.name" class="plat-image">
            <div class="plat-info">
              <h3>{{ plat.name }}</h3>
              <div class="plat-price">{{ plat.price }}€</div>
              <div class="plat-actions">
                <button @click="editPlat(plat)" class="btn btn-small btn-primary">Modifier</button>
                <button @click="deletePlat(plat.id)" class="btn btn-small btn-danger">Supprimer</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pas de plats -->
        <div v-if="restaurantPlats.length === 0 && !showAddPlat" class="empty-state">
          <p>🍽️ Aucun plat ajouté pour le moment</p>
          <button @click="showAddPlat = true" class="btn btn-primary">Ajouter votre premier plat</button>
        </div>
      </div>

      <!-- Page Commandes -->
      <div v-if="currentPage === 'commandes'" class="bo-content">
        <div class="section-header">
          <h2>Commandes Reçues</h2>
          <div class="commandes-stats">
            <span class="stat">{{ commandesRestaurant.length }} commandes</span>
          </div>
        </div>

        <div class="commandes-list">
          <div v-for="commande in commandesRestaurant" :key="commande.id" class="commande-card">
            <div class="commande-header">
              <div class="commande-info">
                <h3>Commande #{{ commande.id }}</h3>
                <p class="commande-date">{{ formatDate(commande.date) }}</p>
              </div>
              <div class="commande-total">
                <span class="total">{{ commande.total }}€</span>
                <span class="status" :class="commande.status">{{ getStatusText(commande.status) }}</span>
              </div>
            </div>
            <div class="commande-items">
              <div v-for="item in commande.items" :key="item.id" class="commande-item">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-quantity">x{{ item.quantity }}</span>
                <span class="item-price">{{ item.price * (item.quantity ? item.quantity : 1) }}€</span>
              </div>
            </div>
            <div class="commande-actions">
              <button v-if="commande.status === 'pending'" @click="updateCommandeStatus(commande.id, 'confirmed')" class="btn btn-small btn-success">Confirmer</button>
              <button v-if="commande.status === 'confirmed'" @click="updateCommandeStatus(commande.id, 'ready')" class="btn btn-small btn-warning">Prêt</button>
              <button v-if="commande.status === 'ready'" @click="updateCommandeStatus(commande.id, 'delivered')" class="btn btn-small btn-info">Livré</button>
            </div>
          </div>
        </div>

        <!-- Pas de commandes -->
        <div v-if="commandesRestaurant.length === 0" class="empty-state">
          <p>📦 Aucune commande reçue pour le moment</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Page restaurateur protégée par middleware global
definePageMeta({
  layout: 'bo',
  middleware: 'bo-auth-global-client'
})

import { ref, onMounted, computed } from 'vue'
import type { Restaurant } from '~/modules/restaurant/types'
import type { Dish } from '~/modules/dish/types'
import type { User } from '~/modules/user/types'
import type { Commande } from '~/modules/commande/types'

// État de l'application
const currentPage = ref('restaurant')
const currentUser = ref<User | null>(null)
const editRestaurant = ref(false)
const showAddPlat = ref(false)
const showEditPlat = ref(false)
const editingPlatId = ref<number | null>(null)

// Données
const restaurants = ref<Restaurant[]>([])
const plats = ref<Dish[]>([])
const commandes = ref<Commande[]>([])

// Formulaires
const restaurantForm = ref({
  name: '',
  street: '',
  postalCode: '',
  city: ''
})

const platForm = ref({
  name: '',
  image: '',
  price: 0,
  description: '',
  category: ''
})

// Computed
const userRestaurant = computed(() => {
  if (!currentUser.value?.restaurantId) return null
  return restaurants.value.find(r => r.id === currentUser.value?.restaurantId)
})

const restaurantPlats = computed(() => {
  if (!userRestaurant.value) return []
  return plats.value.filter(p => p.restaurantId === userRestaurant.value!.id)
})

const commandesRestaurant = computed(() => {
  if (!userRestaurant.value) return []
  return commandes.value.filter(c => c.restaurantId === userRestaurant.value!.id)
})

// Méthodes
const loadData = async () => {
  try {
    // Charger les restaurants
    const restaurantsRes = await $fetch('/api/restaurants') as Restaurant[]
    restaurants.value = restaurantsRes

    // Charger les plats pour ce restaurant
    if (currentUser.value?.restaurantId) {
      const platsRes = await $fetch('/api/dishes', {
        query: { restaurantId: currentUser.value.restaurantId }
      }) as Dish[]
      plats.value = platsRes

      // Charger les commandes pour ce restaurant
      const commandesRes = await $fetch('/api/commandes', {
        query: { restaurantId: currentUser.value.restaurantId }
      }) as Commande[]
      commandes.value = commandesRes
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
}

const logout = () => {
  localStorage.removeItem('bo-user')
  
  // Supprimer le cookie d'authentification
  const authCookie = useCookie('bo-auth')
  authCookie.value = null
  
  navigateTo('/bo')
}

const saveRestaurant = () => {
  // TODO: Sauvegarder les modifications du restaurant
  console.log('Sauvegarder restaurant:', restaurantForm.value)
  editRestaurant.value = false
}

const savePlat = () => {
  if (showEditPlat.value && editingPlatId.value) {
    // Modifier un plat existant
    const platIndex = plats.value.findIndex(p => p.id === editingPlatId.value)
    if (platIndex !== -1 && plats.value[platIndex]) {
      const existingPlat = plats.value[platIndex]
      plats.value[platIndex] = {
        id: existingPlat.id,
        restaurantId: existingPlat.restaurantId,
        name: platForm.value.name,
        image: platForm.value.image,
        price: platForm.value.price,
        description: platForm.value.description || '',
        category: platForm.value.category || ''
      }
    }
  } else {
    // Ajouter un nouveau plat
    const newPlat: Dish = {
      id: Date.now(),
      name: platForm.value.name,
      image: platForm.value.image,
      price: platForm.value.price,
      description: platForm.value.description || '',
      category: platForm.value.category || '',
      restaurantId: userRestaurant.value?.id || 0
    }
    plats.value.push(newPlat)
  }
  closeModal()
}

const editPlat = (plat: Dish) => {
  platForm.value = {
    name: plat.name,
    price: plat.price,
    image: plat.image ?? '',
    description: plat.description ?? '',
    category: plat.category ?? ''
  }
  editingPlatId.value = plat.id
  showEditPlat.value = true
  showAddPlat.value = true // Afficher le formulaire
}

const deletePlat = (platId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
    plats.value = plats.value.filter(p => p.id !== platId)
  }
}

const closeModal = () => {
  showAddPlat.value = false
  showEditPlat.value = false
  editingPlatId.value = null
  platForm.value = {
    name: '',
    image: '',
    price: 0
  }
}

const updateCommandeStatus = (commandeId: number, newStatus: string) => {
  const commande = commandes.value.find(c => c.id === commandeId)
  if (commande) {
    commande.status = newStatus as any
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    ready: 'Prête',
    delivered: 'Livrée'
  }
  return statusMap[status] || status
}

// Initialisation
onMounted(async () => {
  const userData = localStorage.getItem('bo-user')
  if (userData) {
    currentUser.value = JSON.parse(userData)
  }
  
  // Charger les données
  await loadData()
  
  // Initialiser le formulaire restaurant avec les données existantes
  if (userRestaurant.value) {
    restaurantForm.value = {
      name: userRestaurant.value.name,
      city: userRestaurant.value.city || ''
      // street et postalCode ne sont pas dans le type importé, donc ignorés
    }
  }
})
</script>

<style scoped>
.bo-restaurateur-layout {
    display: flex;
    height: 100vh;
    width: 100%;
}

/* Sidebar */
.bo-sidebar {
  width: 280px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
}

.bo-logo {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.bo-logo h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.restaurant-name {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0.5rem 0 0 0;
  font-weight: 400;
}

.bo-nav {
  flex: 1;
  padding: 1rem 0;
}

.bo-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.bo-nav li {
  margin: 0.5rem 0;
}

.bo-nav a {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.bo-nav a:hover, .bo-nav li.active a {
  background: rgba(255,255,255,0.15);
  color: white;
}

.bo-nav .icon {
  margin-right: 0.75rem;
  font-size: 1.2rem;
}

.logout-btn {
  margin-top: 20px;
  color: rgba(255,255,255,0.8) !important;
}

.logout-btn:hover {
  background-color: rgba(255,255,255,0.15) !important;
  color: white !important;
}

.bo-logout {
  padding: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.2);
}

.btn-logout {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.1);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.3s ease;
}

.btn-logout:hover {
  background: rgba(255,255,255,0.2);
}

.btn-logout .icon {
  margin-right: 0.5rem;
}

/* Main content */
.bo-main {
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  overflow-y: auto;
  height: 100vh;
}

.bo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.bo-header h1 {
  margin: 0;
  color: #2d3748;
  font-size: 2rem;
  font-weight: 700;
}

.user-info {
  color: #718096;
  font-weight: 500;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  margin: 0;
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn .icon {
  margin-right: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #718096;
  color: white;
}

.btn-secondary:hover {
  background: #4a5568;
}

.btn-success {
  background: #38a169;
  color: white;
}

.btn-success:hover {
  background: #2f855a;
}

.btn-danger {
  background: #e53e3e;
  color: white;
}

.btn-danger:hover {
  background: #c53030;
}

.btn-warning {
  background: #f39c12;
  color: white;
}

.btn-warning:hover {
  background: #e67e22;
}

.btn-info {
  background: #3498db;
  color: white;
}

.btn-info:hover {
  background: #2980b9;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Content area */
.restaurant-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* Restaurant info card */
.restaurant-info {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.restaurant-info:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.info-row {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
}

.info-row:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.info-row label {
  font-weight: 600;
  width: 150px;
  color: #2d3748;
}

.info-row span {
  color: #718096;
}

/* Edit form inline */
.restaurant-form, .edit-form {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

.form-control, .restaurant-form input, .restaurant-form textarea, .restaurant-form select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-control:focus, .restaurant-form input:focus, .restaurant-form textarea:focus, .restaurant-form select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

/* Plats grid */
.plats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.plat-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.plat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.plat-image {
  width: 100%;
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #e2e8f0;
  object-fit: cover;
}

.plat-info {
  padding: 0;
}

.plat-info h3, .plat-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 5px 0;
}

.plat-description {
  color: #718096;
  margin-bottom: 15px;
  font-size: 14px;
}

.plat-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e67e22;
  margin-bottom: 15px;
}

.plat-actions {
  display: flex;
  gap: 10px;
}

.plat-actions .btn {
  flex: 1;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Add plat form inline */
.add-plat-form {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

/* Commandes */
.commandes-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.commande-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.commande-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.commande-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.commande-info h3 {
  margin: 0 0 5px 0;
  color: #2d3748;
  font-weight: 600;
}

.commande-date {
  margin: 0;
  color: #718096;
  font-size: 0.875rem;
}

.commande-total {
  text-align: right;
}

.total {
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 5px;
}

.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.status.pending {
  background-color: #ffeaa7;
  color: #d63031;
}

.status.confirmed {
  background-color: #81ecec;
  color: #00b894;
}

.status.ready {
  background-color: #fab1a0;
  color: #e17055;
}

.status.delivered {
  background-color: #00b894;
  color: white;
}

.commande-items {
  margin-bottom: 15px;
}

.commande-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f8f9fa;
}

.commande-item:last-child {
  border-bottom: none;
}

.item-name {
  flex: 1;
  color: #2c3e50;
}

.item-quantity {
  color: #6c757d;
  margin: 0 15px;
}

.item-price {
  font-weight: 600;
  color: #e67e22;
}

.commande-actions {
  display: flex;
  gap: 10px;
}

.commandes-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 2rem;
}

.stat {
  background: #e3f2fd;
  color: #1976d2;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state h3 {
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content, .modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  color: #2d3748;
}

.btn-close, .close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #718096;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body .form-group {
  margin-bottom: 1.5rem;
}

.modal-body label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

.modal-body input,
.modal-body textarea,
.modal-body select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.modal-body input:focus,
.modal-body textarea:focus,
.modal-body select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-footer, .modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.alert-danger {
  background: #fed7d7;
  color: #c53030;
  border: 1px solid #feb2b2;
}

/* Responsive */
@media (max-width: 768px) {
  .bo-sidebar {
    transform: translateX(-100%);
  }
  
  .bo-main {
    margin-left: 0;
    padding: 1rem;
  }
  
  .bo-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .plats-grid, .commandes-grid {
    grid-template-columns: 1fr;
  }
  
  .commandes-stats {
    flex-wrap: wrap;
  }
}
</style>