import { createUploadthing, type FileRouter } from "uploadthing/server"

const f = createUploadthing()

const auth = async (req: Request) => ({ id: "fakeId" }) // Fake auth function

export const uploadThingFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req)

      if (!user) throw new Error("Unauthorized")

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)

      console.log("file url", file.url)

      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type UploadThingFileRouter = typeof uploadThingFileRouter
