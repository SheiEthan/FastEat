<template>
  <div class="restaurant-card">
    <img :src="image" alt="Restaurant image" class="restaurant-img" />
    <div class="restaurant-info">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string; description: string; image: string }>()
</script>
