import { name as APP_NAME } from '@/../manifest.json'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export const pinia = createPinia()
export const persistedState = createPersistedState({
    key: keyName => `${APP_NAME}.${keyName}`
})

pinia.use(persistedState)