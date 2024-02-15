import Vue from '@vitejs/plugin-vue'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    build: {
        emptyOutDir: false,
        rollupOptions: {
            input: 'src/entrypoints/core.ts',
            output: {
                format: 'iife',
                entryFileNames: '[name].js'
            }
        }
    },
    plugins: [
        AutoImport({
            imports: [
                'vue',
                'pinia',
                '@vueuse/core',
                {
                    'naive-ui': [
                        'useDialog',
                        'useMessage',
                        'useNotification',
                        'useLoadingBar'
                    ]
                }
            ]
        }),
        Components({
            resolvers: [
                NaiveUiResolver()
            ]
        }),
        Vue()
    ]
})