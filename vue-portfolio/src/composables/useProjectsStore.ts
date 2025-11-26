import { ref, computed } from 'vue'
import type { Project } from '../types/Project'
import { fetchProjects } from '../data/projectsService'

const projects = ref<Project[]>([])
const loaded = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)

const searchTerm = ref('')
const selectedType = ref<'all' | string>('all')

const STORAGE_KEY = 'portfolio-extra-projects'

function loadExtraProjectsFromStorage(): Project[] {
    if (typeof window === 'undefined') return []

    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    try {
        const parsed = JSON.parse(raw) as Project[]
        if (!Array.isArray(parsed)) return []
        return parsed
    } catch {
        return []
    }
}

function saveExtraProjectsToStorage(extraProjects: Project[]) {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extraProjects))
}

async function loadProjects() {
    if (loaded.value || loading.value) return

    loading.value = true
    error.value = null

    try {
        // Projets de base
        const baseProjects = await fetchProjects()

        // Projets ajoutés côté client
        const extraProjects = loadExtraProjectsFromStorage()

        // Fusion sans doublons
        const baseIds = new Set(baseProjects.map((p) => p.id))
        const merged = [...baseProjects]

        for (const p of extraProjects) {
            if (!baseIds.has(p.id)) {
                merged.push(p)
            }
        }

        projects.value = merged
        loaded.value = true
    } catch (e: any) {
        error.value = e?.message ?? 'Erreur inconnue lors du chargement des projets'
    } finally {
        loading.value = false
    }
}

function addProject(partial: Omit<Project, 'id'>) {
    const id = crypto.randomUUID()
    const newProject: Project = { ...partial, id }

    projects.value.push(newProject)

    const extraProjects = loadExtraProjectsFromStorage()
    extraProjects.push(newProject)
    saveExtraProjectsToStorage(extraProjects)
}

function deleteProject(id: string) {
    projects.value = projects.value.filter((p) => p.id !== id)

    const extraProjects = loadExtraProjectsFromStorage()
    const updatedExtra = extraProjects.filter((p) => p.id !== id)
    saveExtraProjectsToStorage(updatedExtra)
}

const filteredProjects = computed(() => {
    const term = searchTerm.value.toLowerCase()

    return projects.value.filter((p) => {
        const matchesSearch =
            !term ||
            p.title.toLowerCase().includes(term) ||
            p.shortDescription.toLowerCase().includes(term) ||
            p.type.toLowerCase().includes(term)

        const matchesType =
            selectedType.value === 'all' || p.type === selectedType.value

        return matchesSearch && matchesType
    })
})

export function useProjectsStore() {
    return {
        projects,
        filteredProjects,
        loaded,
        loading,
        error,
        searchTerm,
        selectedType,
        loadProjects,
        addProject,
        deleteProject,
    }
}
