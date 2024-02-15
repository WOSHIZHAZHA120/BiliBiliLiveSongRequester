<script lang="ts" setup>
import { playlist } from '@/core/live.ts'
</script>

<template>
    <n-list bordered hoverable>
        <n-list-item v-for="request in playlist">
            <div class="text-center">
                <n-text class="text-3xl fw-bold whitespace-nowrap">
                    {{ request.name }} - {{ request.artist }}
                </n-text>

                <n-text :depth="3" class="text-xl ml-2">
                    ({{ request.id }})
                </n-text>
            </div>
        </n-list-item>

        <n-list-item v-if="playlist.length <= 0">
            <n-empty/>
        </n-list-item>
    </n-list>
</template>