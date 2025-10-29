import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from '../../app/stores/user/userStore'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('setUser définit l’utilisateur et isAuthenticated à true', () => {
    const store = useUserStore()
    const fakeUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@doe.com' }
    store.setUser(fakeUser)
    expect(store.user).toEqual(fakeUser)
    expect(store.isAuthenticated).toBe(true)
  })

  it('logout réinitialise l’utilisateur et isAuthenticated à false', () => {
    const store = useUserStore()
    const fakeUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@doe.com' }
    store.setUser(fakeUser)
    store.logout()
    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })
})