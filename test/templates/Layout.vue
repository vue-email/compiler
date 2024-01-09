<script setup lang="ts">
defineProps({
  title: String,
})
</script>

<template>
  <body>
    <h1>{{ title }}</h1>
    <slot />
  </body>
</template>
