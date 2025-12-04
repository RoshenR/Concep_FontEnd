<template>
  <section class="max-w-4xl mx-auto px-4 py-10 md:py-14" v-if="project">
    <RouterLink
        to="/projects"
        class="text-sm text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300"
    >
      ← Retour aux projets
    </RouterLink>

    <header class="mt-4 mb-6 space-y-3">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">
        {{ project.title }}
      </h1>
      <div class="flex items-center gap-2 text-xs">
        <span
            class="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-300/70 dark:bg-cyan-500/10 dark:text-cyan-200 dark:border-cyan-500/30"
        >
          {{ project.type }}
        </span>
        <span class="text-slate-500 dark:text-slate-400" v-if="project.technologies?.length">
          {{ project.technologies.join(' • ') }}
        </span>
      </div>
    </header>

    <div
        class="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-soft/30 space-y-4 dark:border-slate-800 dark:bg-slate-900/80"
    >
      <img
          v-if="project.image"
          :src="project.image"
          :alt="project.title"
          class="w-full rounded-xl mb-4 object-cover max-h-80"
      />

      <article class="prose prose-slate max-w-none text-sm leading-relaxed dark:prose-invert">
        <p class="whitespace-pre-line">
          {{ project.description }}
        </p>
      </article>
    </div>
  </section>

  <section
      v-else
      class="max-w-4xl mx-auto px-4 py-10 md:py-14"
  >
    <RouterLink
        to="/projects"
        class="text-sm text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300"
    >
      ← Retour aux projets
    </RouterLink>
    <p class="mt-4 text-slate-600 dark:text-slate-300">
      Projet introuvable.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useProjectsStore } from '../composables/useProjectsStore'

const route = useRoute()
const { projects, loadProjects, loaded } = useProjectsStore()

onMounted(async () => {
  if (!loaded.value) {
    await loadProjects()
  }
})

const project = computed(() => {
  const id = route.params.id as string
  return projects.value.find((p) => p.id === id)
})
</script>
