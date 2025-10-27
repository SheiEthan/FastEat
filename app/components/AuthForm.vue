<template>
  <div>
    <div class="auth-tabs">
      <button @click="currentTab = 'login'" :class="{ active: currentTab === 'login' }" class="tab-btn">Connexion</button>
      <button @click="currentTab = 'register'" :class="{ active: currentTab === 'register' }" class="tab-btn">Inscription</button>
    </div>
    <div v-if="currentTab === 'login'" class="auth-form">
      <h2>Se connecter</h2>
      <form @submit.prevent="handleLogin">
        <slot name="login-fields" />
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <BaseButton type="submit" :disabled="loading">{{ loading ? 'Connexion...' : 'Se connecter' }}</BaseButton>
      </form>
    </div>
    <div v-if="currentTab === 'register'" class="auth-form">
      <h2>S'inscrire</h2>
      <form @submit.prevent="handleRegister">
        <slot name="register-fields" />
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <BaseButton type="submit" :disabled="loading">{{ loading ? 'Inscription...' : "S'inscrire" }}</BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
const currentTab = ref('login')
const error = ref('')
const loading = ref(false)
const handleLogin = () => $emit('login')
const handleRegister = () => $emit('register')
</script>
