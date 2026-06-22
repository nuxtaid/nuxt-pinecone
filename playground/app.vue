<template>
  <div>
    <h1>Nuxt Pinecone Playground</h1>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
const { data } = await useFetch('/api/indexes')
</script>
