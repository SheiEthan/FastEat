<template>
  <button :class="computedClass" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ color?: string; size?: string }>()

const computedClass = computed(() => {
  let classes = ['btn']
  classes.push('btn-primary')
  if (props.size === 'lg') classes.push('btn-lg')
  return classes.join(' ')
})
</script>
