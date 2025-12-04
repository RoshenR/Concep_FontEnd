import type { Project } from '../types/Project'

export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch('/projects.json')

    if (!res.ok) {
        throw new Error('Erreur lors du chargement des projets')
    }

    return res.json()
}
