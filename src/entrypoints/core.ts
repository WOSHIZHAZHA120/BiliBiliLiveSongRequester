import Config from '@/components/Config.vue'
import { pinia } from '@/core/shared'

plugin.onConfig(() => {
    const element = document.createElement('div')
    const app = createApp(Config)

    app.use(pinia)
    app.mount(element)

    return element
})