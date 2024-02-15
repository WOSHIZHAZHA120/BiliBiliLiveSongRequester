<script lang="ts" setup>
import { useAppStore } from '@/core/stores.ts'
import { LyricLine } from '@/types/LibLyric'
import { isDefined } from 'remeda'

defineProps<{
    readonly line: LyricLine
}>()

const appStore = useAppStore()
</script>

<template>
    <n-space :size="0" justify="center">
        <n-text v-if="!isDefined(line.dynamicLyric)" v-text="line.originalLyric"/>

        <n-text v-for="lyric in line.dynamicLyric" v-else
                :class="{ 'transition-(opacity duration-[calc(var(--duration)*1ms)]) !opacity-100': appStore.currentDurationTime >= lyric.time, 'mr-2': lyric.endsWithSpace }"
                :style="{ '--duration': lyric.duration }" class="opacity-50" v-text="lyric.word.trim()"/>
    </n-space>
</template>