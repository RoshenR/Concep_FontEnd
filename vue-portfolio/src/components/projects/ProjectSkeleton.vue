<template>
  <article
      class="relative bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-4 animate-pulse"
  >
    <!-- Image placeholder -->
    <div class="relative overflow-hidden rounded-xl h-40 bg-slate-200/80 dark:bg-slate-800/80" />

    <!-- Badge + techno -->
    <div class="flex items-center justify-between gap-2 text-[11px]">
      <div class="flex flex-wrap items-center gap-2">
        <span
            class="inline-block w-20 h-5 rounded-full bg-slate-200 dark:bg-slate-700"
        />
        <span
            class="inline-block w-28 h-3 rounded-full bg-slate-200 dark:bg-slate-700"
        />
      </div>
    </div>

    <!-- Titre -->
    <div class="space-y-2 mt-1">
      <div class="w-3/4 h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div class="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div class="w-5/6 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>

    <!-- Lien -->
    <div class="mt-auto pt-2">
      <div class="w-28 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
  </article>
</template>

<script setup lang="ts">
</script>
