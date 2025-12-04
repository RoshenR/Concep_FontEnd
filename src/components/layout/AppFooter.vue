<template>
  <footer class="border-t border-slate-200/70 bg-slate-50/80 dark:border-slate-800/70 dark:bg-slate-950/80">
    <div
        class="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-[11px] text-slate-500 dark:text-slate-400"
    >
      <p>
        © {{ new Date().getFullYear() }} NovaDev Studio — Portfolio développeur web.
      </p>
      <p class="flex gap-4">
        <a href="#" class="hover:text-cyan-600 dark:hover:text-cyan-300">Profil pro</a>
        <a href="#" class="hover:text-cyan-600 dark:hover:text-cyan-300">Code source</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
