<template>
  <section class="max-w-5xl mx-auto px-4 py-10 md:py-14 space-y-16">
    <!-- HERO -->
    <header class="grid md:grid-cols-[3fr,2fr] gap-10 items-center animate-in">
      <div class="space-y-4">
        <p
            class="inline-flex items-center gap-2 text-[11px] font-medium text-cyan-700 bg-cyan-100/70 border border-cyan-300/70 rounded-full px-3 py-1 dark:text-cyan-300 dark:bg-cyan-500/10 dark:border-cyan-500/30"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          Développeur Web & Applications
        </p>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Construire des applications
          <span class="text-cyan-600 dark:text-cyan-300">fiables</span>
          et des interfaces
          <span class="text-cyan-600 dark:text-cyan-300">agréables</span>.
        </h1>
        <p class="text-slate-600 max-w-2xl text-sm md:text-base dark:text-slate-300">
          Développement d’API, intégration front avec Vue.js, conception de jeux
          interactifs et mise en place de projets pédagogiques structurés.
        </p>

        <div class="flex flex-wrap gap-3 pt-2">
          <RouterLink
              to="/projects"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 text-slate-50 text-sm font-semibold hover:bg-cyan-500 transition-colors shadow-soft/40"
          >
            Voir les projets
          </RouterLink>
          <RouterLink
              :to="{ path: '/', hash: '#contact' }"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 hover:border-cyan-400 hover:text-cyan-600 transition-colors dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
          >
            Me contacter
          </RouterLink>
        </div>
      </div>

      <div
          class="relative rounded-2xl border border-slate-200 bg-white/90 shadow-soft p-5 flex flex-col gap-3 overflow-hidden dark:bg-slate-900/70 dark:border-slate-700/80"
      >
        <div
            class="absolute -right-10 -top-10 w-40 h-40 bg-cyan-300/25 rounded-full blur-3xl dark:bg-cyan-500/10"
        />
        <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Stack principale
        </h2>
        <p class="text-xs text-slate-500 max-w-xs dark:text-slate-400">
          Focus sur le JavaScript/TypeScript, Vue.js, APIs REST et bonnes pratiques backend.
        </p>
        <div class="flex flex-wrap gap-2 mt-2 text-[11px]">
          <span
              class="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 dark:bg-slate-800/80 dark:border-slate-600/80 dark:text-slate-200"
          >
            Vue.js · TypeScript
          </span>
          <span
              class="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 dark:bg-slate-800/80 dark:border-slate-600/80 dark:text-slate-200"
          >
            Node.js · Express
          </span>
          <span
              class="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 dark:bg-slate-800/80 dark:border-slate-600/80 dark:text-slate-200"
          >
            PostgreSQL · MongoDB
          </span>
          <span
              class="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 dark:bg-slate-800/80 dark:border-slate-600/80 dark:text-slate-200"
          >
            Tailwind CSS
          </span>
        </div>
      </div>
    </header>

    <!-- SECTION PROJETS -->
    <section class="space-y-3 animate-in animate-delay-1">
      <h2 class="text-2xl font-semibold">Projets</h2>
      <p class="text-slate-600 text-sm max-w-2xl dark:text-slate-400">
        Sélection de projets réalisés : APIs, applications web, jeux interactifs…
      </p>
      <RouterLink
          to="/projects"
          class="inline-flex items-center gap-1 text-xs text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
      >
        Voir tous les projets →
      </RouterLink>
    </section>

    <!-- SECTION COMPÉTENCES / SERVICES -->
    <section class="grid md:grid-cols-2 gap-6 animate-in animate-delay-2">
      <div
          class="rounded-2xl border border-slate-200 bg-white/90 p-5 md:p-6 shadow-soft/20 space-y-4 dark:border-slate-800 dark:bg-slate-900/70 animate-in animate-delay-3"
      >
        <h2 class="text-lg font-semibold mb-1">Compétences</h2>
        <p class="text-slate-500 text-xs mb-2 dark:text-slate-400">
          Quelques domaines techniques avec lesquels je travaille régulièrement.
        </p>
        <ul class="grid grid-cols-2 gap-2 text-xs text-slate-800 dark:text-slate-200">
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Frontend : HTML, CSS, Vue.js
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Backend : Node.js, PHP
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Bases de données : SQL, NoSQL
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Tests & qualité de code
          </li>
        </ul>
      </div>

      <div
          class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-soft/20 space-y-3 dark:border-slate-800 dark:bg-slate-900/70"
      >
        <h2 class="text-lg font-semibold mb-1">Services</h2>
        <p class="text-slate-500 text-xs mb-2 dark:text-slate-400">
          Types de missions possibles (dans un cadre pédagogique ou freelance).
        </p>
        <ul class="space-y-2 text-xs text-slate-800 dark:text-slate-200">
          <li>• Intégration de maquettes en Vue.js / Tailwind CSS</li>
          <li>• Création d’API REST pour applications web</li>
          <li>• Petits jeux ou expériences interactives pour le web</li>
          <li>• Amélioration de projets existants (refactor, performance, UX)</li>
        </ul>
      </div>
    </section>

    <!-- SECTION À PROPOS -->
    <section
        class="rounded-2xl border border-slate-200 bg-white/90 p-5 md:p-6 shadow-soft/20 space-y-4 dark:border-slate-800 dark:bg-slate-900/70"
    >
      <h2 class="text-lg font-semibold flex items-center gap-2">
        À propos
        <span class="text-xs px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-300/70 dark:bg-cyan-500/10 dark:text-cyan-200 dark:border-cyan-500/40">
          NovaDev Studio
        </span>
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        Je suis actuellement en formation dans le développement web (niveau bac+3) et en alternance
        dans une entreprise où je travaille sur des projets concrets : intégration front, petites
        applications internes, automatisations et amélioration d’outils existants.
      </p>

      <p class="text-sm text-slate-600 dark:text-slate-300">
        À côté de mon alternance, j’aime développer mes propres projets et expérimenter de nouvelles
        technos dès que j’en ai l’occasion. C’est ce que je présente dans ce portfolio : une sélection
        de travaux personnels, de projets d’école et de prototypes plus avancés.
      </p>

      <p class="text-sm text-slate-600 dark:text-slate-300">
        Même si mon emploi du temps est déjà bien rempli avec l’alternance, je reste ouvert à des
        <span class="font-medium">petites missions freelance ponctuelles</span> principalement de
        l’intégration web, la création de pages ou mini-sites, ou l’amélioration d’un projet existant
        (UX, performance, front moderne). L’idée : aider sur des missions courtes, simples, mais
        bien réalisées.
      </p>

      <p class="text-sm text-slate-600 dark:text-slate-300">
        J’essaie de garder une approche claire dans ma manière de travailler : communication honnête,
        deadlines réalistes, et code propre autant que possible. J’aime comprendre le besoin,
        proposer des solutions, puis construire quelque chose qui fonctionne vraiment pour la
        personne en face.
      </p>
      <RouterLink
          :to="{ path: '/', hash: '#contact' }"
          class="inline-flex items-center gap-1 text-xs text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
      >
        Discuter d’un projet →
      </RouterLink>
    </section>

    <!-- CONTACT -->
    <ContactSection />
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ContactSection from '../components/home/ContactSection.vue'
</script>
