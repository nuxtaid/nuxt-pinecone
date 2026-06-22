export default defineNuxtConfig({
  modules: ['nuxt-pinecone'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  pinecone: {
    // apiKey is read from NUXT_PINECONE_API_KEY env var
  },
})
