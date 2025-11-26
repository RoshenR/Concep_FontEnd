<template>
  <section class="mt-10 border-t border-slate-800 pt-8">
    <h2 class="text-xl font-semibold mb-4">Ajouter un projet (démo)</h2>

    <form @submit.prevent="handleSubmit" class="grid md:grid-cols-2 gap-4">
      <!-- Titre -->
      <div class="space-y-2 md:col-span-2">
        <label class="block text-sm">Titre</label>
        <input
            v-model="form.title"
            class="w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm
                 border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Ex : GameLibrary API"
        />
      </div>

      <!-- Type -->
      <div class="space-y-2">
        <label class="block text-sm">Type</label>
        <select
            v-model="form.type"
            class="w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm
                 border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">Choisir un type…</option>
          <option>Projet d’école</option>
          <option>Application web</option>
          <option>Backend</option>
          <option>Application interactive</option>
          <option>Mini-jeu</option>
          <option>Site vitrine</option>
          <option>À venir</option>
        </select>
      </div>

      <!-- Technologies -->
      <div class="space-y-2">
        <label class="block text-sm">Technologies (séparées par des virgules)</label>
        <input
            v-model="technologiesText"
            class="w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm
                 border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Ex : Vue.js, TypeScript, Tailwind CSS"
        />
      </div>

      <!-- Description courte -->
      <div class="space-y-2 md:col-span-2">
        <label class="block text-sm">Description courte</label>
        <input
            v-model="form.shortDescription"
            class="w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm
                 border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Résumé rapide du projet (une phrase)"
        />
      </div>

      <!-- Description complète -->
      <div class="space-y-2 md:col-span-2">
        <label class="block text-sm">Description complète</label>
        <textarea
            v-model="form.description"
            rows="4"
            class="w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm
                 border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Détails du contexte, objectifs, stack, difficultés…"
        ></textarea>
      </div>

      <!-- Image (URL optionnelle) -->
      <div class="space-y-2 md:col-span-2">
        <label class="block text-sm">Image (URL, optionnelle)</label>
        <input
            v-model="form.image"
            class="w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm
                 border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Ex : /images/mon-projet.jpg"
        />
      </div>

      <button
          type="submit"
          class="mt-2 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-semibold hover:bg-emerald-400"
      >
        Ajouter le projet
      </button>

      <p v-if="error" class="md:col-span-2 text-xs text-red-400">
        {{ error }}
      </p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Project } from '../../types/Project'

const emit = defineEmits<{
  (e: 'project-added', value: Omit<Project, 'id'>): void
}>()

const form = reactive<Omit<Project, 'id'>>({
  title: '',
  type: '',
  shortDescription: '',
  description: '',
  image: '',
  technologies: [],
})

const technologiesText = ref('')
const error = ref<string | null>(null)

function handleSubmit() {
  error.value = null

  if (!form.title.trim()) {
    error.value = 'Le titre est obligatoire.'
    return
  }

  if (!form.type.trim()) {
    error.value = 'Le type est obligatoire.'
    return
  }

  if (!form.shortDescription.trim()) {
    error.value = 'La description courte est obligatoire.'
    return
  }

  if (!form.description.trim()) {
    error.value = 'La description complète est obligatoire.'
    return
  }

  const technologies = technologiesText.value
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

  const payload: Omit<Project, 'id'> = {
    title: form.title.trim(),
    type: form.type.trim(),
    shortDescription: form.shortDescription.trim(),
    description: form.description.trim(),
    image: form.image?.trim() || undefined,
    technologies: technologies.length ? technologies : undefined,
  }

  emit('project-added', payload)

  // reset du formulaire
  form.title = ''
  form.type = ''
  form.shortDescription = ''
  form.description = ''
  form.image = ''
  form.technologies = []
  technologiesText.value = ''
}
</script>
