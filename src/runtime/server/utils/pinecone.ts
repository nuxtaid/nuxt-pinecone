import { Pinecone } from '@pinecone-database/pinecone'
import { useRuntimeConfig } from '#imports'

let _pinecone: Pinecone | undefined

export function usePinecone(): Pinecone {
  if (!_pinecone) {
    const config = useRuntimeConfig().pinecone

    if (!config.apiKey) {
      throw new Error('Missing Pinecone API key. Set it via `NUXT_PINECONE_API_KEY` environment variable or in your nuxt.config `pinecone.apiKey`.')
    }

    _pinecone = new Pinecone({
      apiKey: config.apiKey,
      ...(config.controllerHostUrl && { controllerHostUrl: config.controllerHostUrl }),
      ...(config.sourceTag && { sourceTag: config.sourceTag }),
      ...(config.maxRetries !== undefined && { maxRetries: config.maxRetries }),
      ...(config.assistantRegion && { assistantRegion: config.assistantRegion }),
      ...(config.caller && { caller: config.caller }),
    })
  }

  return _pinecone
}
