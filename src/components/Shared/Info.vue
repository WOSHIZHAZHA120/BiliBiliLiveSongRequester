<script lang="ts" setup>
import { useAppStore } from '@/core/stores.ts'

const appStore = useAppStore()
</script>

<template>
    <n-space :size="0" :wrap="false" :wrap-item="false" class="leading-tight" vertical>
        <n-space :size="0" :wrap="false">
            <n-text class="whitespace-nowrap">
                {{ appStore.currentPlaying.data?.name }}
            </n-text>

            <n-text :depth="3" class="ml-2 whitespace-nowrap">
                {{ appStore.currentPlaying.data?.transNames?.map(alias => `(${alias})`).join(' ') }}
            </n-text>
        </n-space>

        <n-text class="whitespace-nowrap">
            {{ appStore.currentPlaying.data?.artists.map(artist => artist.name).join(' / ') ?? '未知' }}
        </n-text>

        <n-text type="info">ID: {{ appStore.currentPlaying.data?.id }}</n-text>
    </n-space>
</template>