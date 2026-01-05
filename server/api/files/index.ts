import { blob } from 'hub:blob'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  return await blob.list({
    prefix: user?.username || '',
    limit: 100
  })
})
