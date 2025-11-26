import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import ProjectsView from '../pages/ProjectsView.vue'
import ProjectDetailView from '../pages/ProjectDetailView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/projects', name: 'projects', component: ProjectsView },
        { path: '/projects/:id', name: 'project-detail', component: ProjectDetailView, props: true },
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
