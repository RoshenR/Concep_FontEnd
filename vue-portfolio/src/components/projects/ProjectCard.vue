<template>
  <article
      class="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 hover:border-cyan-400/60 transition"
  >
    <div class="relative overflow-hidden rounded-xl" v-if="project.image">
      <img
          :src="project.image"
          :alt="project.title"
          class="w-full h-44 object-cover"
      />
    </div>

    <div class="flex items-center justify-between gap-2 text-xs">
      <div class="flex items-center gap-2">
        <span
            class="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 font-semibold"
        >
          {{ project.type }}
        </span>
        <span class="text-slate-400" v-if="project.technologies?.length">
          {{ project.technologies.join(' • ') }}
        </span>
      </div>

      <!-- Bouton suppression admin -->
      <button
          v-if="canDelete"
          type="button"
          class="text-[11px] text-red-400 hover:text-red-300 underline-offset-2 hover:underline"
          @click="$emit('delete', project.id)"
      >
        Supprimer
      </button>
    </div>

    <h3 class="text-xl font-bold">{{ project.title }}</h3>
    <p class="text-slate-300 text-sm">
      {{ project.shortDescription }}
    </p>

    <RouterLink
        :to="'/projects/' + project.id"
        class="text-cyan-300 font-semibold text-sm hover:text-cyan-200 mt-auto"
    >
      Découvrir le projet →
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
