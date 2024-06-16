import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react"
import type { UploadThingFileRouter } from "db/uploadthing"

export const UploadButton = generateUploadButton<UploadThingFileRouter>()
export const UploadDropzone = generateUploadDropzone<UploadThingFileRouter>()
