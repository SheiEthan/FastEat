
import { test, expect } from '@nuxt/test-utils/playwright'

// Test E2E : Connexion d'un utilisateur existant

// test.describe('Authentification', () => {
  // Ce test simule la connexion d'un utilisateur via le formulaire de login
  test('Un utilisateur peut se connecter', async ({ page }) => {
    // Aller sur la page d'authentification
    await page.goto('/auth')
    // Cliquer sur l'onglet "Connexion" (au cas où l'inscription serait affichée par défaut)
    await page.getByRole('button', { name: 'Connexion' }).click()
    // Remplir le champ email
    await page.getByLabel('Email').fill('jean@client.com')
    // Remplir le champ mot de passe
    await page.getByLabel('Mot de passe').fill('password123')
    // Cliquer sur le bouton "Se connecter"
    await page.getByRole('button', { name: /se connecter/i }).click()
    // Vérifier que l'utilisateur est bien redirigé vers la page d'accueil après connexion
    await expect(page).toHaveURL('/')
  })
// })
