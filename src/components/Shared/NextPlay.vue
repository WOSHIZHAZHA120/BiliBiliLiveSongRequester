<script lang="ts" setup>
import { playlist } from '@/core/live'
import { BetterNCM } from '@/types/betterNCM'
import { first, isDefined } from 'remeda'

const next = computed(() => {
    return first(playlist) as BetterNCM.SimpleSongInfo
})
</script>

<template>
    <n-space :size="0" :wrap="false" justify="center">
        <n-collapse-transition :show="isDefined(next)">
            下一首播放:
            <FadeTransition mode="out-in">
                <n-text :key="next.id">
                    {{ next.name }} - {{ next.artist }}
                </n-text>
            </FadeTransition>
        </n-collapse-transition>

        <n-collapse-transition :show="playlist.length > 1" class="ml-2">
            (还有

            <div class="inline-block">
                <NumberRoll :target="playlist.length - 1"/>
            </div>

            首)
        </n-collapse-transition>
    </n-space>
</template>