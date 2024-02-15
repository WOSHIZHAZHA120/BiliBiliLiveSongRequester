import { mergeDeep } from 'remeda'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import config from './vite.config'

// https://vitejs.dev/config
export default defineConfig(
    mergeDeep(config as Record<string, unknown>, {
        build: {
            rollupOptions: {
                input: 'src/entrypoints/panel.ts'
            }
        },
        plugins: [
            UnoCSS(),
            ...config.plugins
        ]
    })
)