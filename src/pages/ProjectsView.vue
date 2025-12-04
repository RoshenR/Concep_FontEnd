<template>
  <section class="max-w-5xl mx-auto px-4 py-10 md:py-14 space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold">Projets</h1>
      <p class="text-slate-600 text-sm max-w-2xl dark:text-slate-400">
        Recherche par mot-clé, filtre par type, ajout et suppression (protégée) de projets.
      </p>
    </header>

    <ProjectFilters
        :search="searchTerm"
        :type="selectedType"
        :projects="projects"
        @update:search="searchTerm = $event"
        @update:type="selectedType = $event"
    />

    <!-- 🔄 ÉTAT CHARGEMENT : SKELETONS -->
    <div v-if="loading" class="grid md:grid-cols-2 gap-6">
      <ProjectSkeleton v-for="n in 4" :key="n" />
    </div>

    <!-- ❌ ÉTAT ERREUR -->
    <div v-else-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>

    <!-- ✅ ÉTAT NORMAL : VRAIS PROJETS -->
    <div v-else class="grid md:grid-cols-2 gap-6">
      <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          :can-delete="true"
          @delete="handleDelete"
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
import ProjectSkeleton from '../components/projects/ProjectSkeleton.vue'
import { ADMIN_PASSWORD } from '../constants/auth'
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
  deleteProject,
} = useProjectsStore()

onMounted(() => {
  loadProjects()
})

function handleProjectAdded(partial: Omit<Project, 'id'>) {
  addProject(partial)
}

function handleDelete(id: string) {
  const password = window.prompt('Mot de passe admin requis pour supprimer ce projet :')

  if (password !== ADMIN_PASSWORD) {
    if (password !== null) {
      window.alert('Mot de passe incorrect.')
    }
    return
  }

  const confirmDelete = window.confirm('Confirmer la suppression de ce projet ?')
  if (!confirmDelete) return

  deleteProject(id)
}
</script>
