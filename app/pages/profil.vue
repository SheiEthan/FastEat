<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Mon Profil</h3>
          </div>
          <div class="card-body">
            <div v-if="!userStore.user" class="text-center">
              <p>Chargement des informations...</p>
            </div>
            
            <form v-else @submit.prevent="updateProfile">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="prenom" class="form-label">Prénom</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="prenom" 
                    v-model="profileForm.prenom"
                    placeholder="Entrez votre prénom"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="nom" class="form-label">Nom</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="nom" 
                    v-model="profileForm.nom"
                    placeholder="Entrez votre nom"
                  />
                </div>
              </div>
              
              <div class="mb-3">
                <label for="email" class="form-label">Adresse email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  v-model="profileForm.email"
                  placeholder="Entrez votre email"
                  readonly
                />
                <small class="text-muted">L'email ne peut pas être modifié</small>
              </div>
              
              <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  id="telephone" 
                  v-model="profileForm.telephone"
                  placeholder="Entrez votre numéro de téléphone"
                />
              </div>
              
              <div class="mb-3">
                <label class="form-label">Adresse</label>
                <input 
                  type="text" 
                  class="form-control mb-2" 
                  v-model="profileForm.adresse.rue"
                  placeholder="Rue"
                />
                <div class="row">
                  <div class="col-4">
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="profileForm.adresse.codePostal"
                      placeholder="Code postal"
                    />
                  </div>
                  <div class="col-8">
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="profileForm.adresse.ville"
                      placeholder="Ville"
                    />
                  </div>
                </div>
              </div>
              
              <div class="mb-3">
                <small class="text-muted">
                  Membre depuis le {{ formatDate(userStore.user?.registrationDate) }}
                </small>
              </div>
              
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  {{ isLoading ? 'Sauvegarde...' : 'Sauvegarder' }}
                </button>
              </div>
              
              <div v-if="message" class="alert mt-3" :class="messageType === 'success' ? 'alert-success' : 'alert-danger'">
                {{ message }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Mon Profil - UberEat',
  meta: [
    { name: 'description', content: 'Gérez vos informations personnelles et votre adresse de livraison.' },
    { property: 'og:title', content: 'Mon Profil - UberEat' },
    { property: 'og:description', content: 'Gérez vos informations personnelles et votre adresse de livraison.' },
    { property: 'og:type', content: 'website' }
  ]
})
import type { Client } from '~/modules/client/types'
const user = ref<Client | null>(null)
const isLoading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const profileForm = ref({
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  adresse: {
    rue: '',
    codePostal: '',
    ville: ''
  }
})

// Charger les infos utilisateur
onMounted(() => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user')
    if (userData) {
      user.value = JSON.parse(userData)
      
      // Remplir le formulaire avec les données utilisateur
      profileForm.value = {
        prenom: user.value?.firstName || '',
        nom: user.value?.lastName || '',
        email: user.value?.email || '',
        telephone: user.value?.phone || '',
        adresse: {
          rue: user.value?.address?.street || '',
          codePostal: user.value?.address?.postalCode || '',
          ville: user.value?.address?.city || ''
        }
      }
    }
  }
})

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const updateProfile = async () => {
  isLoading.value = true
  message.value = ''
  
  try {
    // Simuler une sauvegarde (en production, appeler une API)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mettre à jour les données en localStorage
    const updatedUser = {
      ...user.value,
      prenom: profileForm.value.prenom,
      nom: profileForm.value.nom,
      telephone: profileForm.value.telephone,
      adresse: profileForm.value.adresse
    }
    
    localStorage.setItem('user', JSON.stringify(updatedUser))
    user.value = {
      id: updatedUser.id ?? user.value?.id ?? 0,
      firstName: updatedUser.firstName ?? profileForm.value.prenom,
      lastName: updatedUser.lastName ?? profileForm.value.nom,
      email: updatedUser.email ?? profileForm.value.email,
      password: updatedUser.password ?? user.value?.password ?? '',
      phone: updatedUser.phone ?? profileForm.value.telephone,
      address: {
        street: updatedUser.address?.street ?? profileForm.value.adresse.rue,
        postalCode: updatedUser.address?.postalCode ?? profileForm.value.adresse.codePostal,
        city: updatedUser.address?.city ?? profileForm.value.adresse.ville
      },
      registrationDate: updatedUser.registrationDate ?? user.value?.registrationDate ?? '',
      orders: updatedUser.orders ?? user.value?.orders ?? [],
      image: updatedUser.image ?? user.value?.image,
      description: updatedUser.description ?? user.value?.description
    }
    
    message.value = 'Profil mis à jour avec succès !'
    messageType.value = 'success'
    
    setTimeout(() => {
      message.value = ''
    }, 3000)
    
  } catch (error) {
    message.value = 'Erreur lors de la sauvegarde'
    messageType.value = 'error'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
}

.card-header {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  border-bottom: none;
}

.form-control:focus {
  border-color: #27ae60;
  box-shadow: 0 0 0 0.2rem rgba(39, 174, 96, 0.25);
}



.btn-outline-secondary {
  transition: transform 0.2s;
}

.btn-outline-secondary:hover {
  transform: translateY(-2px);
}

.alert {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>