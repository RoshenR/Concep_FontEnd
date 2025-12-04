<template>
  <Transition name="scroll-top">
    <button
        v-if="isVisible"
        type="button"
        class="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center rounded-full
             w-9 h-9 md:w-10 md:h-10
             bg-slate-900/90 text-slate-100 shadow-lg border border-slate-700/80
             hover:bg-slate-800 hover:border-cyan-400 hover:text-cyan-200
             dark:bg-slate-100/90 dark:text-slate-900 dark:border-slate-300/80
             dark:hover:bg-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-700
             text-sm transition-colors"
        @click="scrollToTop"
        aria-label="Revenir en haut de la page"
    >
      ↑
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)

function handleScroll() {
  // On affiche le bouton après ~350px
  isVisible.value = window.scrollY > 350
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-top-enter-active,
.scroll-top-leave-active {
  transition:
      opacity 0.2s ease,
      transform 0.2s ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}

.scroll-top-enter-to,
.scroll-top-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
