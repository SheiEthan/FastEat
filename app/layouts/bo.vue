<template>
  <div class="bo-layout">
    <slot />
  </div>
</template>

<style scoped>
.bo-layout {
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}
</style>