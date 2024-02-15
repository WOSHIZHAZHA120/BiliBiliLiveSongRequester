<script lang="ts" setup>
import { useAppStore } from '@/core/stores.ts'

const appStore = useAppStore()
</script>

<template>
    <n-image :src="appStore.currentPlaying.data?.album.picUrl" :width="512" preview-disabled/>
</template>