<template>
  <div class="bo-admin-layout">
    <!-- Menu latéral gauche -->
    <aside class="bo-sidebar">
      <div class="bo-logo">
        <h3>🏢 Admin Panel</h3>
      </div>
      <nav class="bo-nav">
        <ul>
          <li class="active">
            <a href="#" @click.prevent="currentPage = 'restaurateurs'">
              <i class="icon">🏪</i>
              <span>Restaurateurs</span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="currentPage = 'commandes'">
              <i class="icon">📦</i>
              <span>Commandes</span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="currentPage = 'statistiques'">
              <i class="icon">📊</i>
              <span>Statistiques</span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="currentPage = 'parametres'">
              <i class="icon">⚙️</i>
              <span>Paramètres</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="bo-logout">
        <button @click="logout" class="btn-logout">
          <i class="icon">🚪</i>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- Contenu principal -->
    <main class="bo-main">
      <div class="bo-header">
        <h1>Gestion des Restaurateurs</h1>
        <button @click="showAddForm = true" class="btn btn-primary">
          <i class="icon">➕</i>
          Ajouter un restaurateur
        </button>
      </div>

      <!-- Liste des restaurateurs -->
      <div class="bo-content">
        <div v-if="restaurateurs.length === 0" class="empty-state">
          <div class="empty-icon">🏪</div>
          <h3>Aucun restaurateur</h3>
          <p>Commencez par ajouter votre premier restaurateur</p>
        </div>

        <div v-else class="restaurateurs-grid">
          <div v-for="resto in restaurateurs" :key="resto.id" class="restaurateur-card">
            <div class="card-header">
              <h4>{{ resto.email }}</h4>
              <span class="badge">{{ resto.role }}</span>
            </div>
            <div class="card-body">
              <p>ID: {{ resto.id }}</p>
              <p>Créé le: {{ formatDate(resto.createdAt || new Date()) }}</p>
            </div>
            <div class="card-actions">
              <button @click="editRestaurateur(resto)" class="btn btn-secondary">
                ✏️ Modifier
              </button>
              <button @click="removeRestaurateur(resto.id)" class="btn btn-danger">
                🗑️ Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal d'ajout -->
    <div v-if="showAddForm" class="modal-overlay" @click="showAddForm = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Ajouter un restaurateur</h3>
          <button @click="showAddForm = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="addRestaurateur" class="modal-body">
          <div class="form-group">
            <label for="new-email">Email</label>
            <input id="new-email" v-model="newEmail" type="email" class="form-control" placeholder="email@example.com" required />
          </div>
          <div class="form-group">
            <label for="new-password">Mot de passe</label>
            <input id="new-password" v-model="newPassword" type="password" class="form-control" placeholder="Mot de passe" required />
          </div>
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <div class="modal-footer">
            <button type="button" @click="showAddForm = false" class="btn btn-secondary">Annuler</button>
            <button type="submit" class="btn btn-success">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page admin protégée par middleware global
definePageMeta({
  layout: 'bo',
  middleware: 'bo-auth-global-client'
})

import { ref, onMounted } from 'vue'

interface RestoUser {
  id: number
  email: string
  role: string
  createdAt?: Date
}

const restaurateurs = ref<RestoUser[]>([])
const newEmail = ref('')
const newPassword = ref('')
const error = ref('')
const showAddForm = ref(false)
const currentPage = ref('restaurateurs')

const fetchRestaurateurs = async () => {
  try {
    const res = await fetch('/api/bo/restaurateurs')
    const data = await res.json()
    restaurateurs.value = data.restaurateurs || []
  } catch (e) {
    // En cas d'erreur API, utilise les données du JSON
    console.error('Erreur API, utilisation des données statiques')
    restaurateurs.value = []
  }
}

onMounted(fetchRestaurateurs)

const addRestaurateur = async () => {
  error.value = ''
  // Simuler l'ajout
  const newId = Math.max(...restaurateurs.value.map(r => r.id)) + 1
  restaurateurs.value.push({
    id: newId,
    email: newEmail.value,
    role: 'restaurateur',
    createdAt: new Date()
  })
  newEmail.value = ''
  newPassword.value = ''
  showAddForm.value = false
}

const removeRestaurateur = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce restaurateur ?')) {
    restaurateurs.value = restaurateurs.value.filter(r => r.id !== id)
  }
}


/**
 * Modifier un restaurateur
 * @param {RestoUser} resto - Le restaurateur à modifier
 */
const editRestaurateur = (resto: RestoUser) => {
  console.log('Modifier:', resto)
}

const logout = () => {
  // Supprimer les données utilisateur du localStorage et du cookie
  if (import.meta.client) {
    localStorage.removeItem('bo-user')
    
    // Supprimer le cookie d'authentification
    const authCookie = useCookie('bo-auth')
    authCookie.value = null
  }
  navigateTo('/bo')
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('fr-FR')
}
</script>

<style scoped>
.bo-admin-layout {
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

/* Content area */
.bo-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #718096;
}

.restaurateurs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.restaurateur-card {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.restaurateur-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.card-header h4 {
  margin: 0;
  color: #2d3748;
  font-weight: 600;
}

.badge {
  background: #bee3f8;
  color: #2b6cb0;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-body {
  margin-bottom: 1.5rem;
}

.card-body p {
  margin: 0.5rem 0;
  color: #718096;
  font-size: 0.9rem;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
}

.card-actions .btn {
  flex: 1;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Modal */
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

.modal-content {
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

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #718096;
}

.modal-body {
  padding: 1.5rem;
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

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-footer {
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
    align-items: stretch;
  }
  
  .restaurateurs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
