<template>
  <div
      class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 relative overflow-hidden"
  >
    <!-- Fond gradient + grid -->
    <div
        class="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
    >
      <div
          class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-slate-100 to-purple-500/10 dark:from-cyan-500/10 dark:via-slate-900 dark:to-purple-500/10"
      />
      <div class="absolute inset-0 bg-grid-slate bg-grid-s mix-blend-soft-light" />
    </div>

    <div class="relative flex flex-col min-h-screen">
      <!-- Header -->
      <AppHeader />

      <!-- Contenu avec transition de pages -->
      <main class="flex-1">
        <RouterView v-slot="{ Component, route }">
          <Transition name="page" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </Transition>
        </RouterView>
      </main>

      <!-- Bouton scroll to top global -->
      <ScrollToTopButton />

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import ScrollToTopButton from './components/ui/ScrollToTopButton.vue'
</script>
