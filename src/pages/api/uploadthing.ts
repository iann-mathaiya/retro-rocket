import { uploadThingFileRouter } from "db/uploadthing"
import { createRouteHandler } from "uploadthing/server"

export const runtime = "nodejs"

export const { GET, POST } = createRouteHandler({
  router: uploadThingFileRouter,
  config: {
    uploadthingSecret: import.meta.env.UPLOADTHING_SECRET,
  },
})
