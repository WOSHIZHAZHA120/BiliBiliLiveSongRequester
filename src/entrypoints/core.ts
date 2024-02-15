import { pinia } from '@/core/shared.ts'
import { useAppStore } from '@/core/stores.ts'
import { name as APP_NAME } from '../../manifest.json'

plugin.onConfig(tools => {
    const appStore = useAppStore(pinia)

    const makeConfig = (name: string, keyName: keyof typeof appStore) => {
        const input = tools.makeInput('直播间 ID', {
            value: appStore[keyName]
        })

        input.addEventListener('input', () => {
            appStore.$patch({
                [keyName]: input.value
            })
        })

        return dom('div', {}, ...[
            dom('span', {
                innerText: name
            }),
            input
        ])
    }

    return dom('div', {}, ...[
        tools.makeBtn(`打开窗口`, () => {
            window.open(`${BETTERNCM_FILES_PATH}${plugin.pluginPath.split('.')[1]}/dist/panel.html`, APP_NAME)
        }),
        makeConfig('直播间 ID', 'liveId')
    ])
})