<template>
  <section id="contact" class="max-w-3xl mx-auto px-4 py-16">
    <h2 class="text-2xl font-semibold mb-2">Contact</h2>
    <p class="text-slate-400 text-sm mb-6">
      Formulaire de contact simulé : les données ne sont pas réellement envoyées,
      mais la validation côté client est bien en place.
    </p>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Nom -->
      <div>
        <label class="block text-sm mb-1">Nom</label>
        <input
            v-model="form.name"
            type="text"
            class="w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm
                 focus:outline-none focus:ring-2
                 "
            :class="errors.name
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-700 focus:ring-cyan-500'"
        />
        <p v-if="errors.name" class="text-xs text-red-400 mt-1">
          {{ errors.name }}
        </p>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm mb-1">Email</label>
        <input
            v-model="form.email"
            type="email"
            class="w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm
                 focus:outline-none focus:ring-2
                 "
            :class="errors.email
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-700 focus:ring-cyan-500'"
        />
        <p v-if="errors.email" class="text-xs text-red-400 mt-1">
          {{ errors.email }}
        </p>
      </div>

      <!-- Message -->
      <div>
        <label class="block text-sm mb-1">Message</label>
        <textarea
            v-model="form.message"
            rows="4"
            class="w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm
                 focus:outline-none focus:ring-2
                 "
            :class="errors.message
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-700 focus:ring-cyan-500'"
        ></textarea>
        <p v-if="errors.message" class="text-xs text-red-400 mt-1">
          {{ errors.message }}
        </p>
      </div>

      <button
          type="submit"
          class="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-sm font-semibold hover:bg-cyan-400"
      >
        Envoyer (simulation)
      </button>
    </form>

    <p
        v-if="success"
        class="mt-4 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-700 rounded-lg px-3 py-2"
    >
      Merci ! Votre message a bien été envoyé (simulation).
    </p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const errors = reactive<{
  name?: string
  email?: string
  message?: string
}>({})

const success = ref(false)

function validate(): boolean {
  success.value = false
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = 'Le nom est obligatoire.'
  }

  if (!form.email.trim()) {
    errors.email = 'L’email est obligatoire.'
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Adresse email invalide.'
  }

  if (form.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères.'
  }

  return !errors.name && !errors.email && !errors.message
}

function handleSubmit() {
  if (!validate()) return

  // Simulation d’envoi
  success.value = true

  // Tu peux laisser les champs remplis ou les vider, au choix :
  // form.name = ''
  // form.email = ''
  // form.message = ''
}
</script>
