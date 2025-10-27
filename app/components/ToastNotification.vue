<template>
  <transition name="toast-fade">
    <div v-if="visible" class="toast-notification">
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{ message: string; visible: boolean }>()
</script>

<style scoped>
.toast-notification {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background: #27ae60;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(39, 174, 96, 0.18);
  font-size: 1.1rem;
  z-index: 9999;
  animation: toast-in 0.3s;
}
@keyframes toast-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.3s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
}
</style>
