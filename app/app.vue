<template>
  <div :class="bodyClass">
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const bodyClass = computed(() => {
  // Vérification si route.name existe et transformation sécurisée
  if (route.name) {
    return 'page-' + String(route.name)
  }
  return 'page-default'
})
</script>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
