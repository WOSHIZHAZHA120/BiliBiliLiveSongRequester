<script lang="ts" setup>
import DynamicLyric from '@/components/Shared/DynamicLyric.vue'
import { useAppStore } from '@/core/stores.ts'
import { LyricLine } from '@/types/LibLyric'
import { findLastIndex } from 'remeda'

const appStore = useAppStore()
const parent = inject<Window>('parent')!

const lyrics = ref({} as {
    readonly hash: string
    readonly lyrics: LyricLine[]
})

const currentLine = computed(() => {
    const index = findLastIndex(lyrics.value?.lyrics ?? [], line => {
        return line.time + line.duration <= appStore.currentDurationTime
    })

    return lyrics.value?.lyrics?.[index + 1]
})

onMounted(() => {
    const syncLyrics = () => {
        // @ts-ignore
        lyrics.value = parent.window.currentLyrics
    }

    parent.document.addEventListener('lyrics-updated', () => {
        syncLyrics()
    })

    syncLyrics()
})
</script>

<template>
    <n-space :size="0" class="fw-bold mt-2 text-center" vertical>
        <n-text>{{ currentLine?.romanLyric }}</n-text>
        <DynamicLyric :key="lyrics.hash" :line="currentLine"/>
        <n-text>{{ currentLine?.translatedLyric }}</n-text>
    </n-space>
</template>