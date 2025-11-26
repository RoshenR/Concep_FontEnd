<template>
  <div class="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
    <input
        :value="search"
        @input="onSearchInput"
        type="text"
        placeholder="Rechercher par mot-clé..."
        class="w-full md:flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
             bg-white border-slate-300 text-slate-900 focus:ring-cyan-500
             dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
    />

    <select
        :value="type"
        @change="onTypeChange"
        class="w-full md:w-48 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
             bg-white border-slate-300 text-slate-900 focus:ring-cyan-500
             dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
    >
      <option value="all">Tous les types</option>
      <option
          v-for="t in uniqueTypes"
          :key="t"
          :value="t"
      >
        {{ t }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '../../types/Project'

const props = defineProps<{
  search: string
  type: string
  projects: Project[]
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:type', value: string): void
}>()

const uniqueTypes = computed(() => {
  const set = new Set<string>()
  props.projects.forEach((p) => set.add(p.type))
  return Array.from(set)
})

function onSearchInput(event: Event) {
  emit('update:search', (event.target as HTMLInputElement).value)
}

function onTypeChange(event: Event) {
  emit('update:type', (event.target as HTMLSelectElement).value)
}
</script>
