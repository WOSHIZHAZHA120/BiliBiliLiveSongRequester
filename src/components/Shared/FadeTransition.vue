<template>
    <Transition name="fade">
        <slot/>
    </Transition>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    @apply transition-opacity ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    @apply opacity-0;
}
</style>