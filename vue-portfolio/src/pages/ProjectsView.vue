<template>
  <section class="max-w-5xl mx-auto px-4 py-12">
    <header class="mb-6">
      <h1 class="text-3xl font-bold mb-2">Projets</h1>
      <p class="text-slate-400 text-sm">
        Recherche par mot-clé, filtre par type et consultation des détails.
      </p>
    </header>

    <ProjectFilters
        :search="searchTerm"
        :type="selectedType"
        :projects="projects"
        @update:search="searchTerm = $event"
        @update:type="selectedType = $event"
    />

    <div v-if="loading" class="text-slate-400 text-sm">
      Chargement des projets...
    </div>
    <div v-else-if="error" class="text-red-400 text-sm">
      {{ error }}
    </div>

    <div
        v-else
        class="grid md:grid-cols-2 gap-6"
    >
      <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
      />
    </div>

    <!-- Formulaire d'ajout de projet -->
    <AddProjectForm @project-added="handleProjectAdded" />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ProjectCard from '../components/projects/ProjectCard.vue'
import ProjectFilters from '../components/projects/ProjectFilters.vue'
import AddProjectForm from '../components/projects/AddProjectForm.vue'
import { useProjectsStore } from '../composables/useProjectsStore'
import type { Project } from '../types/Project'

const {
  projects,
  filteredProjects,
  searchTerm,
  selectedType,
  loading,
  error,
  loadProjects,
  addProject,
} = useProjectsStore()

onMounted(() => {
  loadProjects()
})

function handleProjectAdded(partial: Omit<Project, 'id'>) {
  addProject(partial)
}
</script>
