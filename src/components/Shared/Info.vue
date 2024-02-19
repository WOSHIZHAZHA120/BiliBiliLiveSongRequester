<script lang="ts" setup>
import { useAppStore } from '@/core/stores'
import { isDefined } from 'remeda'

const appStore = useAppStore()

const transName = computed(() => {
    if (!isDefined(appStore.currentPlaying.data.transNames)) {
        return
    }

    return appStore.currentPlaying.data.transNames.map(alias => `(${alias})`).join(' ')
})

const artists = computed(() => {
    if (!isDefined(appStore.currentPlaying.data)) {
        return '未知'
    }

    return appStore.currentPlaying.data.artists.map(artist => artist.name).join(' / ')
})
</script>

<template>
    <n-space :size="0" class="leading-tight" vertical>
        <n-space :size="0" :wrap="false">
            <n-text class="whitespace-nowrap" v-text="appStore.currentPlaying.data.name"/>
            <n-text :depth="3" class="ml-2 whitespace-nowrap" v-text="transName"/>
        </n-space>

        <n-text class="whitespace-nowrap" v-text="artists"/>
        <n-text :depth="3" v-text="(`#${appStore.currentPlaying.data.id}`)"/>
    </n-space>
</template>