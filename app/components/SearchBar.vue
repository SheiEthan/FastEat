<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="search"
      class="form-control"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', search)"
    />
    <button class="btn btn-primary" @click="$emit('search', search)"><i class="bi bi-search"></i></button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue?: string; placeholder?: string }>()
const search = ref(props.modelValue || '')
watch(() => props.modelValue, val => search.value = val)
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
