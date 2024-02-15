import { BetterNCM } from '@/types/betterNCM'

export const useAppStore = defineStore('app', {
    state: () => ({
        currentPlaying: {} as BetterNCM.SongInfo,
        currentDuration: 0,
        liveId: 3148087,
        connectedLiveId: -1
    }),
    getters: {
        currentDurationTime: store => {
            return store.currentDuration * 1000
        }
    },
    persist: {
        paths: ['liveId']
    }
})