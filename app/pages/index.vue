import HeroSection from '@/components/HeroSection.vue'
import BaseButton from '@/components/BaseButton.vue'
import FeatureItem from '@/components/FeatureItem.vue'

definePageMeta({
  title: 'UberEat - Accueil',
  meta: [
    { name: 'description', content: 'Découvrez les meilleurs restaurants près de chez vous et commandez en quelques clics !' },
    { property: 'og:title', content: 'UberEat - Accueil' },
    { property: 'og:description', content: 'Découvrez les meilleurs restaurants près de chez vous et commandez en quelques clics !' },
    { property: 'og:image', content: '/favicon.ico' },
    { property: 'og:type', content: 'website' }
  ]
})
<template>
  <HeroSection>
    <template #title>🍽️ Bienvenue sur UberEat</template>
    <template #subtitle>Découvrez les meilleurs restaurants près de chez vous et commandez en quelques clics !</template>
    <template #actions>
      <NuxtLink to="/restaurants">
        <BaseButton size="lg">
          🏪 Découvrir nos restaurants
        </BaseButton>
      </NuxtLink>
    </template>
    <template #features>
      <FeatureItem>
        <template #icon>⚡</template>
        Livraison rapide
      </FeatureItem>
      <FeatureItem>
        <template #icon>🎯</template>
        Large sélection
      </FeatureItem>
      <FeatureItem>
        <template #icon>💳</template>
        Paiement sécurisé
      </FeatureItem>
    </template>
  </HeroSection>
</template>

<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import BaseButton from '@/components/BaseButton.vue'
import FeatureItem from '@/components/FeatureItem.vue'
</script>