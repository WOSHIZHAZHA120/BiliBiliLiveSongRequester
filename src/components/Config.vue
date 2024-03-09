<script lang="ts" setup>
import { name as APP_NAME } from '@/../manifest.json'
import { useAppStore } from '@/core/stores.ts'
import { darkTheme, dateZhCN, lightTheme, useOsTheme, zhCN } from 'naive-ui'

const openWindow = () => {
    window.open(`${BETTERNCM_FILES_PATH}${plugin.pluginPath.split('.')[1]}/dist/panel.html`, APP_NAME)
}

const appStore = useAppStore()
const osTheme = useOsTheme()

const theme = computed(() => {
    if (osTheme.value === 'dark') {
        return darkTheme
    }

    return lightTheme
})
</script>

<template>
    <n-config-provider :date-locale="dateZhCN" :locale="zhCN" :theme="theme">
        <n-flex class="w-fit" vertical>
            <n-button @click="openWindow">打开窗口</n-button>

            <n-form-item label="直播间 ID">
                <n-input v-model:value="appStore.liveId"/>
            </n-form-item>
        </n-flex>
    </n-config-provider>
</template>