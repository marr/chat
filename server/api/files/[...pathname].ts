import { blob } from 'hub:blob'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const { pathname } = getRouterParams(event)
  if (!pathname.startsWith(`${user?.username}/`)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You do not have permission to access this file'
    })
  }

  return await blob.serve(event, pathname)
})
