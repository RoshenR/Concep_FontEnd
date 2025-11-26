<template>
  <article
      class="relative bg-white/95 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4
           hover:border-cyan-400/70 hover:shadow-soft transition-transform transition-shadow
           duration-300 hover:-translate-y-1 dark:bg-slate-900/70 dark:border-slate-800"
  >
    <div
        class="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 hover:opacity-100 pointer-events-none transition-opacity"
    />

    <div class="relative overflow-hidden rounded-xl" v-if="project.image">
      <img
          :src="project.image"
          :alt="project.title"
          class="w-full h-44 object-cover"
      />
    </div>

    <div class="relative flex items-center justify-between gap-2 text-[11px]">
      <div class="flex flex-wrap items-center gap-2">
        <span
            class="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-300/70 dark:bg-cyan-500/10 dark:text-cyan-200 dark:border-cyan-500/40"
        >
          {{ project.type }}
        </span>
        <span class="text-slate-500 dark:text-slate-400" v-if="project.technologies?.length">
          {{ project.technologies.join(' • ') }}
        </span>
      </div>

      <button
          v-if="canDelete"
          type="button"
          class="text-[11px] text-red-500 hover:text-red-400 underline-offset-2 hover:underline"
          @click="$emit('delete', project.id)"
      >
        Supprimer
      </button>
    </div>

    <div class="relative space-y-1">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ project.title }}</h3>
      <p class="text-slate-600 text-sm line-clamp-3 dark:text-slate-300">
        {{ project.shortDescription }}
      </p>
    </div>

    <RouterLink
        :to="'/projects/' + project.id"
        class="relative inline-flex items-center gap-1 text-xs text-cyan-700 hover:text-cyan-600 mt-auto dark:text-cyan-300 dark:hover:text-cyan-200"
    >
      <span>Découvrir le projet</span>
      <span>→</span>
    </RouterLink>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '../../types/Project'

defineProps<{
  project: Project
  canDelete?: boolean
}>()

defineEmits<{
  (e: 'delete', id: string): void
}>()
</script>
