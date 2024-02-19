<script lang="ts" setup>
import { useAppStore } from '@/core/stores'
import { CurrentLyricInfo } from '@/types/RefinedNowPlaying'
import { isDefined } from 'remeda'

const appStore = useAppStore()
const parent = inject<Window>('parent')!

const current = ref<CurrentLyricInfo>()
const currentLine = computed(() => {
    if (!isDefined(current.value)) {
        return
    }

    return current.value.lyrics.find(line => {
        return line.time + line.duration > appStore.currentDurationTime
    })
})

onMounted(() => {
    const syncLyrics = () => {
        // @ts-ignore
        current.value = parent.window.currentLyrics
    }

    parent.document.addEventListener('lyrics-updated', () => {
        syncLyrics()
    })

    syncLyrics()
})
</script>

<template>
    <template v-if="isDefined(current) && isDefined(currentLine)">
        <FadeTransition mode="out-in">
            <n-space :key="current.hash" :size="0" :wrap-item="false" class="leading-tight mt-2 text-center" vertical>
                <n-text :depth="3" class="text-sm" v-text="currentLine.romanLyric"/>
                <DynamicLyric :key="current.hash" :line="currentLine"/>
                <n-text type="info" v-text="currentLine.translatedLyric"/>
            </n-space>
        </FadeTransition>
    </template>
</template>