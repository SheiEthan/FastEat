<template>
  <div class="bo-login-container">
    <form class="bo-login-form" @submit.prevent="handleLogin">
      <h2>Connexion Back Office</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" class="form-control" placeholder="Votre email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input id="password" v-model="password" type="password" class="form-control" placeholder="Votre mot de passe" required />
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-3">Se connecter</button>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
// Utiliser le layout BO
definePageMeta({
  layout: 'bo'
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  console.log('Tentative de connexion...', { email: email.value, password: password.value })
  
  try {
    const res = await fetch('/api/bo/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    
    console.log('Réponse reçue:', res.status)
    const data = await res.json()
    console.log('Données:', data)
    
    if (data.error) {
      error.value = data.error
      console.log('Erreur:', data.error)
    } else if (data.user) {
      console.log('Utilisateur connecté:', data.user)
      
      // Sauvegarder l'utilisateur dans localStorage et cookie
      if (typeof window !== 'undefined') {
        localStorage.setItem('bo-user', JSON.stringify(data.user))
        
        // Définir également un cookie pour la vérification côté serveur
        const authCookie = useCookie('bo-auth', {
          default: () => '',
          httpOnly: false,
          secure: false,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7 // 7 jours
        })
        authCookie.value = JSON.stringify(data.user)
        
        console.log('Données sauvées dans localStorage et cookie')
        
        if (data.user.role === 'admin') {
          console.log('Redirection vers admin...')
          router.push('/bo/admin')
        } else if (data.user.role === 'restaurateur') {
          console.log('Redirection vers restaurateur...')
          router.push('/bo/restaurateur')
        }
      }
    } else {
      error.value = 'Erreur inconnue.'
      console.log('Aucune donnée utilisateur')
    }
  } catch (e) {
    error.value = 'Erreur réseau.'
    console.error('Erreur réseau:', e)
  }
}
</script>

<style scoped>
.bo-login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
}
.bo-login-form {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  min-width: 320px;
  max-width: 350px;
  width: 100%;
}
.bo-login-form h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-weight: 700;
}
.form-group {
  margin-bottom: 1.2rem;
}
label {
  font-weight: 500;
  color: #34495e;
  margin-bottom: 0.3rem;
  display: block;
}
input.form-control {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  background: #f8fafc;
  margin-top: 0.2rem;
  transition: border 0.2s;
}
input.form-control:focus {
  border-color: #667eea;
  outline: none;
}
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-weight: 600;
  padding: 0.8rem 0;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: background 0.2s;
}
.btn-primary:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b21a8 100%);
}
.alert {
  font-size: 1rem;
  padding: 0.7rem 1rem;
  border-radius: 8px;
}
.alert-danger {
  background: #ffeaea;
  color: #c0392b;
  border: 1px solid #e74c3c;
}
</style>