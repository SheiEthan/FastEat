<template>
  <div class="hero-section">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title"><slot name="title">🍽️ Bienvenue sur UberEat</slot></h1>
        <p class="hero-subtitle"><slot name="subtitle">Découvrez les meilleurs restaurants près de chez vous et commandez en quelques clics !</slot></p>
        <div class="hero-actions">
          <slot name="actions" />
        </div>
        <div class="hero-features">
          <slot name="features" />
        </div>
      </div>
    </div>
  </div>
</template>
