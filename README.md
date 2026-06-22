![nuxt-pinecone](https://raw.githubusercontent.com/nuxtaid/nuxt-pinecone/refs/heads/main/playground/public/logo.svg)

# nuxt-pinecone

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for [Pinecone](https://www.pinecone.io/) vector database. Provides a server-side `usePinecone()` composable with auto-import support.

## Features

- 🔒 &nbsp;Server-only — API key is never exposed to the client
- ⚡ &nbsp;Auto-imported `usePinecone()` utility in server routes
- 🛠 &nbsp;Full [`PineconeConfiguration`](https://docs.pinecone.io/docs/projects) support (`apiKey`, `controllerHostUrl`, `sourceTag`, `maxRetries`, `assistantRegion`, `caller`)
- 📦 &nbsp;Zero config with environment variables

## Quick Setup

Install the module to your Nuxt application:

```bash
npx nuxt module add nuxt-pinecone
```

Add it to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-pinecone'],
  pinecone: {
    // All PineconeConfiguration options are supported
    // apiKey is read from NUXT_PINECONE_API_KEY env var by default
  },
})
```

Set your API key via environment variable (recommended):

```bash
NUXT_PINECONE_API_KEY=your_api_key
```

Or directly in config (not recommended for production):

```ts
export default defineNuxtConfig({
  modules: ['nuxt-pinecone'],
  pinecone: {
    apiKey: 'your_api_key',
  },
})
```

## Usage

Use the auto-imported `usePinecone()` composable in any server route or API handler:

```ts
// server/api/search.post.ts
export default defineEventHandler(async (event) => {
  const { query, topK } = await readBody(event)
  const pinecone = usePinecone()
  const index = pinecone.index('my-index')

  const results = await index.query({
    vector: query,
    topK: topK || 10,
    includeMetadata: true,
  })

  return results.matches
})
```

```ts
// server/api/indexes.get.ts
export default defineEventHandler(async () => {
  const pinecone = usePinecone()
  return await pinecone.listIndexes()
})
```

## Configuration

All options from `PineconeConfiguration` are supported (except `fetchApi` and `additionalHeaders` which are not serializable):

| Option | Env Variable | Description |
|--------|-------------|-------------|
| `apiKey` | `NUXT_PINECONE_API_KEY` | Your Pinecone API key |
| `controllerHostUrl` | `NUXT_PINECONE_CONTROLLER_HOST_URL` | Custom controller host URL |
| `sourceTag` | `NUXT_PINECONE_SOURCE_TAG` | Tag applied to User-Agent header |
| `maxRetries` | `NUXT_PINECONE_MAX_RETRIES` | Max retries after initial request (default: 3) |
| `assistantRegion` | `NUXT_PINECONE_ASSISTANT_REGION` | Region for assistant APIs (default: "us") |
| `caller` | — | Caller info for User-Agent (set in config) |

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm run dev:prepare
  
  # Develop with the playground
  pnpm run dev
  
  # Build the playground
  pnpm run dev:build
  
  # Run ESLint
  pnpm run lint
  
  # Run Vitest
  pnpm run test
  pnpm run test:watch
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-pinecone/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-pinecone

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-pinecone.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-pinecone

[license-src]: https://img.shields.io/npm/l/nuxt-pinecone.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-pinecone

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
