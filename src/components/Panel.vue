<script lang="ts" setup>
import { startLiveListen } from '@/core/live'
import { useAppStore } from '@/core/stores'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { isDefined } from 'remeda'

const appStore = useAppStore()
const parent = inject<Window>('parent')!

tryOnBeforeMount(() => {
    const parentMainPlayerElement = parent.document.querySelector('#main-player')

    if (isDefined(parentMainPlayerElement)) {
        const syncCurrentPlaying = () => {
            // @ts-ignore
            appStore.currentPlaying = parent.betterncm.ncm.getPlayingSong()
        }

        const mutationObserver = new MutationObserver(() => {
            syncCurrentPlaying()
        })

        mutationObserver.observe(parentMainPlayerElement, {
            attributes: true
        })

        syncCurrentPlaying()
    }

    const parentTimeAllElement = parent.document.querySelector<HTMLElement>('time.all')

    if (isDefined(parentTimeAllElement)) {
        const syncTotalDuration = () => {
            const [totalMinutes, remainSeconds] = parentTimeAllElement.innerText.split(':').map(Number)
            appStore.totalDuration = (totalMinutes * 60) + remainSeconds
        }

        const mutationObserver = new MutationObserver(() => {
            syncTotalDuration()
        })

        mutationObserver.observe(parentTimeAllElement, {
            childList: true,
            subtree: true
        })

        syncTotalDuration()
    }

    // @ts-ignore
    parent.window.legacyNativeCmder.appendRegisterCall('PlayProgress', 'audioplayer', (_id: number, progress: number) => {
        appStore.currentDuration = progress
    })

    startLiveListen(parent)
})
</script>

<template>
    <n-config-provider :date-locale="dateZhCN" :locale="zhCN" :theme="darkTheme" class="h-full">
        <n-layout position="absolute">
            <n-layout-content class="fw-bold h-full">
                <n-space align="center" class="h-full" justify="center">
                    <template v-if="isDefined(appStore.currentPlaying)">
                        <n-space vertical>
                            <NextPlay class="mb-5"/>

                            <FadeTransition mode="out-in">
                                <n-space :key="appStore.currentPlaying.data.id" vertical>
                                    <n-space :wrap="false" :wrap-item="false" align="center" class="h-full"
                                             justify="center">
                                        <Cover/>

                                        <div class="h-[512px]">
                                            <n-space class="h-full" justify="space-between" vertical>
                                                <Info/>
                                                <Progress/>
                                            </n-space>
                                        </div>
                                    </n-space>

                                    <Lyrics class="text-3xl"/>
                                </n-space>
                            </FadeTransition>
                        </n-space>
                    </template>

                    <n-empty v-else/>
                </n-space>
            </n-layout-content>
        </n-layout>
    </n-config-provider>
</template>

<style lang="scss">
:root, body {
    @apply m-0 p-0 w-full h-full text-4xl font-sans;
}
</style>