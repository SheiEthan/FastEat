<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">{{ $t('my_profile') }}</h3>
          </div>
          <div class="card-body">
            <div v-if="!clientAuth.user" class="text-center">
              <p>{{ $t('loading') }}</p>
            </div>
            
            <form v-else @submit.prevent="updateProfile">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="prenom" class="form-label">{{ $t('first_name') }}</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    v-model="profileForm.prenom"
                    placeholder="Entrez votre prénom"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="nom" class="form-label">{{ $t('last_name') }}</label>
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
                <label for="email" class="form-label">{{ $t('email') }}</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  v-model="profileForm.email"
                  placeholder="Entrez votre email"
                  readonly
                />
                <small class="text-muted">{{ $t('email_not_editable') }}</small>
              </div>
              
              <div class="mb-3">
                <label for="telephone" class="form-label">{{ $t('phone') }}</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  id="telephone" 
                  v-model="profileForm.telephone"
                  :placeholder="$t('enter_phone')"
                />
              </div>
              
              <div class="mb-3">
                <label class="form-label">{{ $t('address') }}</label>
                <input 
                  type="text" 
                  class="form-control mb-2" 
                  v-model="profileForm.adresse.rue"
                  :placeholder="$t('street')"
                />
                <div class="row">
                  <div class="col-4">
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="profileForm.adresse.codePostal"
                      :placeholder="$t('postal_code')"
                    />
                  </div>
                  <div class="col-8">
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="profileForm.adresse.ville"
                      :placeholder="$t('city')"
                    />
                  </div>
                </div>
              </div>
              
              <div class="mb-3">
                <small class="text-muted">
                  {{ $t('member_since') }} {{ formatDate((clientAuth.user as any)?.registrationDate) }}
                </small>
              </div>
              
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  {{ isLoading ? $t('loading') : $t('save_changes') }}
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
import { useHead, useSeoMeta } from '@unhead/vue'
import { useClientAuthStore } from '@/stores/user/clientAuthStore'
import { onMounted, ref } from 'vue'

useSeoMeta({
  title: 'Mon Profil - FastEat',
  description: 'Gérez vos informations personnelles et votre adresse de livraison.',
  ogTitle: 'Mon Profil - FastEat',
  ogDescription: 'Gérez vos informations personnelles et votre adresse de livraison.',
  ogType: 'website'
})

definePageMeta({ SSR: false })

const clientAuth = useClientAuthStore()
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

onMounted(async () => {
  clientAuth.loadFromStorage()
  const token = clientAuth.user?.token
  if (!token) return
  try {
    const user = await $fetch<any>('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    clientAuth.setUser({ ...clientAuth.user, ...user })
    profileForm.value = {
      prenom: user.firstName || '',
      nom: user.lastName || '',
      email: user.email || '',
      telephone: user.phone || '',
      adresse: {
        rue: user.street || '',
        codePostal: user.postalCode || '',
        ville: user.city || ''
      }
    }
  } catch (e) {
    console.error('Erreur chargement profil:', e)
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
    const token = clientAuth.user?.token
    const updated = await $fetch<any>('/api/users/me', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        firstName: profileForm.value.prenom,
        lastName: profileForm.value.nom,
        phone: profileForm.value.telephone,
        street: profileForm.value.adresse.rue,
        postalCode: profileForm.value.adresse.codePostal,
        city: profileForm.value.adresse.ville,
      }
    })
    clientAuth.setUser({ ...clientAuth.user, ...updated })
    clientAuth.saveToStorage()
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