<template>
  <section class="max-w-5xl mx-auto px-4 py-12 space-y-16">
    <!-- Hero -->
    <header class="space-y-4">
      <p class="text-sm text-cyan-300 font-semibold">Développeur Web & Applications</p>
      <h1 class="text-4xl md:text-5xl font-bold">
        Créer des interfaces soignées et des
        <span class="text-cyan-300">backends robustes</span>.
      </h1>
      <p class="text-slate-300 max-w-2xl text-sm md:text-base">
        Profil développeur orienté web moderne : APIs REST, intégrations front avec Vue.js,
        gestion de données et bonnes pratiques de qualité de code.
      </p>

      <div class="flex flex-wrap gap-3 pt-2">
        <RouterLink
            to="/projects"
            class="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400"
        >
          Voir les projets
        </RouterLink>
        <a
            href="#contact"
            class="px-4 py-2 rounded-lg border border-slate-700 text-sm hover:border-cyan-400 hover:text-cyan-300"
        >
          Me contacter
        </a>
      </div>
    </header>

    <section>
      <h2 class="text-2xl font-semibold mb-2">Projets</h2>
      <p class="text-slate-400 text-sm">
        Sélection de projets web : API, applications front, intégrations complètes.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-2">Compétences</h2>
      <p class="text-slate-400 text-sm">
        Stack centrée sur le JavaScript / TypeScript, Vue.js, Node.js et l’intégration d’API.
      </p>
    </section>

    <!-- Contact complet -->
    <ContactSection />
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ContactSection from '../components/home/ContactSection.vue'
</script>
