
import { test, expect } from '@nuxt/test-utils/playwright'

// Test E2E : Parcours utilisateur - ajout au panier depuis l'accueil
test('Ajout d\'un plat au panier depuis l\'accueil', async ({ page }) => {
    // Aller sur la page d'accueil
    await page.goto('/auth')
    await page.waitForSelector('form', { timeout: 10000 })
    // Cliquer sur l'onglet "Connexion" (au cas où l'inscription serait affichée par défaut)
    await page.getByRole('button', { name: 'Connexion' }).click()
    // Remplir le champ email
    await page.getByLabel('Email').fill('jean@client.com')
    // Remplir le champ mot de passe
    await page.getByLabel('Mot de passe').fill('password123')
    // Cliquer sur le bouton "Se connecter"
    await page.getByRole('button', { name: /se connecter/i }).click()
    // Vérifier que l'utilisateur est bien redirigé vers la page d'accueil après connexion
    await page.waitForTimeout(1000)
    await page.goto('/restaurants')

    const firstCard = page.locator('.restaurant-card').first()
    await firstCard.waitFor({ state: 'visible', timeout: 15000 })
    await firstCard.click({ trial: true }) // test du clic sans exécution
    await firstCard.click()

    await page.waitForSelector('.btn.btn-primary')
    // Cliquer sur le bouton "Ajouter au panier" du premier plat
    await page.locator('.add-cart').first().click()
    // Aller sur la page panier
    await page.goto('/cart')
    // Vérifier qu'il y a au moins un plat dans le panier
    await page.waitForSelector('.dish-item')
    const plats = await page.locator('.dish-item').count()
    expect(plats).toBeGreaterThan(0)
})

