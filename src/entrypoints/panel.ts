import 'virtual:uno.css'

import Panel from '@/components/Panel.vue'
import { pinia } from '@/core/shared.js'

const app = createApp({
    render: () => h(Panel)
})

app.use(pinia)
app.provide<Window>('parent', window.opener)
app.mount(document.body)