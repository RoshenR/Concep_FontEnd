<template>
  <section class="max-w-4xl mx-auto px-4 py-12" v-if="project">
    <RouterLink
        to="/projects"
        class="text-sm text-slate-400 hover:text-cyan-300"
    >
      ← Retour aux projets
    </RouterLink>

    <header class="mt-4 mb-6 space-y-3">
      <h1 class="text-3xl font-bold">{{ project.title }}</h1>
      <div class="flex items-center gap-2 text-xs">
        <span
            class="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 font-semibold"
        >
          {{ project.type }}
        </span>
        <span class="text-slate-400" v-if="project.technologies?.length">
          {{ project.technologies.join(' • ') }}
        </span>
      </div>
    </header>

    <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="w-full rounded-2xl mb-6 object-cover max-h-80"
    />

    <article class="prose prose-invert max-w-none">
      <p class="whitespace-pre-line text-slate-200 text-sm leading-relaxed">
        {{ project.description }}
      </p>
    </article>
  </section>

  <section
      v-else
      class="max-w-4xl mx-auto px-4 py-12"
  >
    <RouterLink
        to="/projects"
        class="text-sm text-slate-400 hover:text-cyan-300"
    >
      ← Retour aux projets
    </RouterLink>
    <p class="mt-4 text-slate-300">
      Projet introuvable.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '../composables/useProjectsStore'

const route = useRoute()
const { projects, loadProjects } = useProjectsStore()

onMounted(() => {
  loadProjects()
})

const projectId = computed(() => route.params.id as string)

const project = computed(() =>
    projects.value.find((p) => p.id === projectId.value)
)
</script>
