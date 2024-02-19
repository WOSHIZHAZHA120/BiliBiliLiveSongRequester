<script lang="ts" setup>
import { range } from 'remeda'

defineProps<{
    readonly target: number
}>()
</script>

<template>
    <n-space v-for="num in String(target)" :size="0" class="h-[1em] leading-none overflow-hidden">
        <n-space :size="0" :style="{ '--value': num }" :wrap-item="false"
                 class="transition-(transform duration-300) translate-y-[calc(var(--value)*-1em)]" vertical>
            <n-text v-for="j in range(1, 10)">
                {{ j }}
            </n-text>
        </n-space>
    </n-space>
</template>