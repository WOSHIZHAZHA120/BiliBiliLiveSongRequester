import { pinia } from '@/core/shared.ts'
import { useAppStore } from '@/core/stores.ts'
import { play, search } from '@/core/utils.ts'
import { BetterNCM } from '@/types/betterNCM'
import { KeepLiveWS } from 'bilibili-live-ws/browser'
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { isDefined } from 'remeda'

export const currentPlayingId = ref<number>()
export const playlist = shallowReactive<BetterNCM.SimpleSongInfo[]>([])

export const startLiveListen = (target: Window) => {
    const appStore = useAppStore(pinia)
    const room = new KeepLiveWS(appStore.liveId)

    const nextPlay = () => {
        currentPlayingId.value = playlist.shift()?.id
    }

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
        const [, message] = info

        if (message.startsWith('点歌')) {
            const keyword = message.split('点歌')[1].trim()
            const result = await search(keyword, target.document)

            playlist.push(result)
        }
    })

    const { ignoreUpdates } = watchIgnorable(() => appStore.currentPlaying, (newPlaying, oldPlaying) => {
        if (newPlaying.data?.id === oldPlaying.data?.id) {
            return
        }

        ignoreUpdates(() => {
            if (newPlaying.data?.id !== currentPlayingId.value) {
                nextPlay()

                if (isDefined(currentPlayingId.value)) {
                    play(currentPlayingId.value, target)
                }
            }
        })
    })
}