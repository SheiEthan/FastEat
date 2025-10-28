<template>
  <HeroSection>
    <template #title>{{ $t('welcome') }}</template>
  <template #subtitle>{{ $t('homepage_subtitle') }}</template>
    <template #actions>
      <NuxtLink to="/restaurants">
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
  </HeroSection>
</template>

<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import BaseButton from '@/components/BaseButton.vue'
import FeatureItem from '@/components/FeatureItem.vue'
</script>