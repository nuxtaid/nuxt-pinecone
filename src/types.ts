import type { ModuleOptions } from '../module'

declare module 'nuxt/schema' {
  interface NuxtConfig {
    pinecone?: ModuleOptions
  }
  interface NuxtOptions {
    pinecone?: ModuleOptions
  }
  interface RuntimeConfig {
    pinecone: {
      apiKey: string
      controllerHostUrl: string
      sourceTag: string
      maxRetries: number
      assistantRegion: string
      caller?: { provider?: string, model: string }
    }
  }
}

export {}
