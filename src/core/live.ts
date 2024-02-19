import { pinia } from '@/core/shared'
import { useAppStore } from '@/core/stores'
import { play, search } from '@/core/utils'
import { BetterNCM } from '@/types/betterNCM'
import { KeepLiveWS } from 'bilibili-live-ws/browser'
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { isDefined } from 'remeda'

export const currentPlaying = ref<BetterNCM.SimpleSongInfo>()
export const playlist = shallowReactive<BetterNCM.SimpleSongInfo[]>([])

export const startLiveListen = (target: Window) => {
    // @ts-ignore
    window.currentPlaying = currentPlaying
    // @ts-ignore
    window.playlist = playlist
    // @ts-ignore
    window.add = async (keyword: string) => {
        const result = await search(keyword, target.document)
        playlist.push(result)
    }

    const appStore = useAppStore(pinia)
    const room = new KeepLiveWS(appStore.liveId)

    room.once('open', () => {
        appStore.connectedLiveId = appStore.liveId

        const { message, unmount } = createDiscreteApi(['message'], {
            configProviderProps: {
                theme: darkTheme
            }
        })

        message.success(`已链接到直播间: ${appStore.connectedLiveId}`, {
            onAfterLeave: () => {
                unmount()
            }
        })
    })

    room.on('DANMU_MSG', async ({ info }) => {
        const command = '点歌'
        const [, message] = info

        if (message.startsWith(command)) {
            const keyword = message.split(command)[1].trim()
            const result = await search(keyword, target.document)

            playlist.push(result)
        }
    })

    watch(() => appStore.currentPlaying, (newPlaying, oldPlaying) => {
        if (!isDefined(newPlaying) || !isDefined(oldPlaying)) {
            return
        }

        if (newPlaying.data.id === oldPlaying.data.id) {
            return
        }

        if (isDefined(currentPlaying.value) && currentPlaying.value.id === newPlaying.data.id) {
            return
        }

        currentPlaying.value = playlist.shift()

        if (!isDefined(currentPlaying.value)) {
            return
        }

        play(currentPlaying.value.id, target)
    })
}