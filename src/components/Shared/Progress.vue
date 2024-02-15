<script lang="ts" setup>
import { useAppStore } from '@/core/stores.ts'

const appStore = useAppStore()
const parent = inject<Window>('parent')!

const totalDuration = ref(0)

const time = computed(() => {
    const convert = (duration: number) => {
        const minutes = Number(Math.floor(duration / 60).toFixed(0))
        const secondsRemain = Number((duration % 60).toFixed(0))

        return `${minutes < 10 ? '0' : ''}${minutes}:${secondsRemain < 10 ? '0' : ''}${secondsRemain}`
    }

    return `${convert(appStore.currentDuration)} / ${convert(totalDuration.value)}`
})

onMounted(() => {
    const totalTimeElement = parent.document.querySelector<HTMLElement>('time.all')

    if (isDefined(totalTimeElement)) {
        const syncTotalDuration = () => {
            const [totalMinutes, remainSeconds] = totalTimeElement.innerText.split(':').map(Number)
            totalDuration.value = totalMinutes * 60 + remainSeconds
        }

        const mutationObserver = new MutationObserver(() => {
            syncTotalDuration()
        })

        mutationObserver.observe(totalTimeElement, {
            childList: true,
            subtree: true
        })

        syncTotalDuration()
    }
})
</script>

<template>
    <n-space :size="0" vertical>
        <n-text class="mt-2" type="success">{{ time }}</n-text>
        <n-progress :percentage="(appStore.currentDuration / totalDuration) * 100" :show-indicator="false" type="line"/>
    </n-space>
</template>