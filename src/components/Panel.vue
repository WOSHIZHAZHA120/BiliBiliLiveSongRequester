<script lang="ts" setup>
import Cover from '@/components/Shared/Cover.vue'
import Info from '@/components/Shared/Info.vue'
import Lyrics from '@/components/Shared/Lyrics.vue'
import Progress from '@/components/Shared/Progress.vue'
import { startLiveListen } from '@/core/live.ts'
import { useAppStore } from '@/core/stores.ts'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { isDefined } from 'remeda'
import { isEmpty } from 'remeda/dist/es'

const appStore = useAppStore()
const parent = inject<Window>('parent')!

onMounted(() => {
    const parentMainPlayerElement = parent.document.querySelector('#main-player')

    if (isDefined(parentMainPlayerElement)) {
        const syncCurrentPlaying = () => {
            appStore.currentPlaying = betterncm.ncm.findApiFunction('getPlayingSong')[0]()
        }

        const mutationObserver = new MutationObserver(() => {
            syncCurrentPlaying()
        })

        mutationObserver.observe(parentMainPlayerElement, {
            attributes: true
        })

        syncCurrentPlaying()
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
        <n-layout class="h-full" has-sider>
            <n-layout-sider :width="500">
                <div class="p-2">
                    <PlayList/>
                </div>
            </n-layout-sider>

            <n-layout-content class="text-12 fw-bold h-full p-2">
                <n-space align="center" class="h-full" justify="center">
                    <n-space v-if="!isEmpty(appStore.currentPlaying)" vertical>
                        <n-space :wrap="false" justify="center">
                            <Cover/>

                            <n-space :size="0" class="h-full" justify="space-between" vertical>
                                <Info/>
                                <Progress class="min-w-120 mb-10"/>
                            </n-space>
                        </n-space>

                        <Lyrics/>
                    </n-space>

                    <n-empty v-else/>
                </n-space>
            </n-layout-content>
        </n-layout>
    </n-config-provider>
</template>

<style lang="scss">
:root, body {
    @apply m-0 p-0 w-full h-full font-sans;
}
</style>