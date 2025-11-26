<template>
  <header
      class="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70"
  >
    <nav class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <RouterLink to="/" class="flex items-center gap-3 group">
        <div
            class="w-9 h-9 rounded-xl bg-slate-200 border border-cyan-400/60 shadow-soft flex items-center justify-center text-xs font-bold text-cyan-700 group-hover:shadow-cyan-500/30 transition-shadow dark:bg-slate-900 dark:text-cyan-300"
        >
          ND
        </div>
        <div class="flex flex-col">
          <span class="font-semibold text-sm sm:text-base leading-tight">
            NovaDev Studio
          </span>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">
            Portfolio développeur web
          </span>
        </div>
      </RouterLink>

      <div class="flex items-center gap-3 text-sm">
        <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="relative px-2 py-1 text-slate-600 hover:text-cyan-600 transition-colors dark:text-slate-300 dark:hover:text-cyan-300"
        >
          <span>{{ item.label }}</span>
          <span
              v-if="$route.path === item.match"
              class="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-sky-500"
          />
        </RouterLink>

        <RouterLink
            :to="{ path: '/', hash: '#contact' }"
            class="hidden sm:inline-flex items-center gap-1 rounded-full border border-slate-300/80 px-3 py-1 text-xs font-medium text-slate-700 hover:border-cyan-400 hover:text-cyan-600 transition-colors dark:border-slate-700/80 dark:text-slate-200 dark:hover:border-cyan-300"
        >
          <span>Contact</span>
        </RouterLink>

        <!-- Toggle thème -->
        <button
            type="button"
            class="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-300/80 bg-slate-100 text-slate-700 text-xs hover:border-cyan-400 hover:text-cyan-600 transition-colors dark:bg-slate-900 dark:border-slate-700/80 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            @click="toggleTheme"
            :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
        >
          <span v-if="isDark">🌙</span>
          <span v-else>☀️</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const navItems = [
  { label: 'Accueil', to: '/', match: '/' },
  { label: 'Projets', to: '/projects', match: '/projects' },
]

const isDark = ref(false)
const STORAGE_KEY = 'theme'

onMounted(() => {
  const root = document.documentElement
  root.classList.add('theme-init')

  const stored = localStorage.getItem(STORAGE_KEY)

  if (stored === 'dark' || stored === 'light') {
    isDark.value = stored === 'dark'
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
  }

  root.classList.toggle('dark', isDark.value)

  // on enlève theme-init après le premier rendu
  requestAnimationFrame(() => {
    root.classList.remove('theme-init')
  })
})

function toggleTheme() {
  const root = document.documentElement

  root.classList.add('theme-switching')

  isDark.value = !isDark.value
  root.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')

  setTimeout(() => {
    root.classList.remove('theme-switching')
  }, 250)
}
</script>
