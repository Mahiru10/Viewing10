<template>
  <router-view />
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const isAuthenticated = ref(false)

    // Simulate authentication check
    const checkAuth = () => {
      // Replace with real authentication logic
      isAuthenticated.value = true // For testing purposes
    }

    checkAuth()

    return {
      isAuthenticated,
    }
  },
}
</script>

<script setup>
//
</script>
