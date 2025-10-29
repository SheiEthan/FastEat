<template>
    <LazyHeroSection>
    <template #title>{{ $t('welcome') }}</template>
  <template #subtitle>{{ $t('homepage_subtitle') }}</template>
    <template #actions>
      <NuxtLink to="/restaurants" class="go-resto">
        <BaseButton size="lg">
          {{ $t('discover_restaurants_btn') }}
        </BaseButton>
      </NuxtLink>
    </template>
    <template #features>
      <FeatureItem>
        <template #icon>⚡</template>
        {{ $t('fast_delivery') }}
      </FeatureItem>
      <FeatureItem>
        <template #icon>🎯</template>
        {{ $t('large_selection') }}
      </FeatureItem>
      <FeatureItem>
        <template #icon>💳</template>
        {{ $t('secure_payment_feature') }}
      </FeatureItem>
    </template>
    </LazyHeroSection>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import HeroSection from '@/components/HeroSection.vue'
import BaseButton from '@/components/BaseButton.vue'
import FeatureItem from '@/components/FeatureItem.vue'

useHead({
  title: 'FastEat - Commandez vos plats préférés',
  meta: [
    { name: 'description', content: 'Découvrez les meilleurs restaurants et plats près de chez vous avec FastEat.' }
  ]
})

useSeoMeta({
  title: 'FastEat - Commandez vos plats préférés',
  description: 'Découvrez les meilleurs restaurants et plats près de chez vous avec FastEat.',
  ogTitle: 'FastEat - Commandez vos plats préférés',
  ogDescription: 'Découvrez les meilleurs restaurants et plats près de chez vous avec FastEat.',
  ogType: 'website'
})
</script>
