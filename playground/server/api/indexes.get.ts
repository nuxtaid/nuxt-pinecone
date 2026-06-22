export default defineEventHandler(async () => {
  const pinecone = usePinecone()
  const indexes = await pinecone.listIndexes()
  return indexes
})
