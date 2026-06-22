import { defineNuxtModule, createResolver, addServerImportsDir } from '@nuxt/kit'
import type { PineconeConfiguration } from '@pinecone-database/pinecone'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions extends Omit<PineconeConfiguration, 'fetchApi' | 'additionalHeaders'> {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-pinecone',
    configKey: 'pinecone',
  },
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Set runtime config for server-side use only (API key should never be exposed to client)
    nuxt.options.runtimeConfig.pinecone = {
      apiKey: options.apiKey || '',
      controllerHostUrl: options.controllerHostUrl || '',
      sourceTag: options.sourceTag || '',
      maxRetries: options.maxRetries ?? 3,
      assistantRegion: options.assistantRegion || '',
      caller: options.caller || undefined,
    }

    // Register server utilities for auto-import
    addServerImportsDir(resolve('./runtime/server/utils'))
  },
})
