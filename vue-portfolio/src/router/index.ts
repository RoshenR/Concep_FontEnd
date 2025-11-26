import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import ProjectsView from '../pages/ProjectsView.vue'
import ProjectDetailView from '../pages/ProjectDetailView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/projects', name: 'projects', component: ProjectsView },
        {
            path: '/projects/:id',
            name: 'project-detail',
            component: ProjectDetailView,
            props: true,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // Si on revient en arrière / avant → position sauvegardée
        if (savedPosition) {
            return savedPosition
        }

        // Si on a un hash (ex: #contact), on scroll dessus
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }

        // Sinon, on remonte en haut
        return { top: 0, behavior: 'smooth' }
    },
})

export default router
