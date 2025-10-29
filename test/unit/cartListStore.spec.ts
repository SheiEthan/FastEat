import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCartListStore } from '../../app/stores/cart/cartListStore'

const fakeDish = { id: 1, name: 'Pizza', price: 10 }

describe('CartList Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('ajoute un plat au panier', () => {
    const store = useCartListStore()
    store.addDish(fakeDish)
    expect(store.dishes.length).toBe(1)
    expect(store.dishes[0].id).toBe(1)
  })

  it('isDishInCart retourne true si le plat est présent', () => {
    const store = useCartListStore()
    store.addDish(fakeDish)
    expect(store.isDishInCart(fakeDish)).toBe(true)
  })

  it('retire un plat du panier', () => {
    const store = useCartListStore()
    store.addDish(fakeDish)
    store.removeDish(fakeDish)
    expect(store.dishes.length).toBe(0)
  })
})
