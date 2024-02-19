<script lang="ts" setup>
import { useAppStore } from '@/core/stores'

const appStore = useAppStore()

const convert = (duration: number) => {
    const minutes = ~~(duration / 60)
    const secondsRemain = ~~(duration % 60)

    return `${minutes < 10 ? '0' : ''}${minutes}:${secondsRemain < 10 ? '0' : ''}${secondsRemain}`
}

const percent = computed(() => {
    return (appStore.currentDuration / appStore.totalDuration) * 100
})
</script>

<template>
    <n-space :wrap-item="false" align="center">
        <n-text v-text="convert(appStore.currentDuration)"/>

        <div class="w-60">
            <n-progress :height="50" :percentage="percent" :show-indicator="false" type="line"/>
        </div>

        <n-text v-text="convert(appStore.totalDuration)"/>
    </n-space>
</template>