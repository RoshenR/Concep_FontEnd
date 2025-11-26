<template>
  <header class="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-slate-800">
    <nav class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <RouterLink to="/" class="flex items-center gap-2">
        <div
            class="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/60 flex items-center justify-center text-xs font-bold text-cyan-300"
        >
          ND
        </div>
        <span class="font-semibold text-sm sm:text-base">
          NovaDev Studio
        </span>
      </RouterLink>

      <div class="flex items-center gap-4 text-sm">
        <RouterLink
            to="/"
            class="text-slate-300 hover:text-cyan-300"
        >
          Accueil
        </RouterLink>
        <RouterLink
            to="/projects"
            class="text-slate-300 hover:text-cyan-300"
        >
          Projets
        </RouterLink>
        <RouterLink
            :to="{ path: '/', hash: '#contact' }"
            class="hidden sm:inline text-slate-300 hover:text-cyan-300"
        >
          Contact
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>
