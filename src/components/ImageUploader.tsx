import type { UploadThingFileRouter } from "db/uploadthing"
import { UploadDropzone } from "lib/uploadthing"
import { useState } from "react"
import type { UploadFileResponse } from "uploadthing/client"

export function ImageUploader() {
  const [imageData, setImageData] = useState<
    UploadFileResponse<{ uploadedBy: string }>[] | null
  >(null)

  return (
    <>
      <UploadDropzone
        className='mt-0 h-full border-slate-300 shadow-sm ut-label:text-slate-700 ut-label:hover:text-orange-500 cursor-pointer'
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res)
          setImageData(res)
          alert("Upload Completed")
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />

      <pre>
        {JSON.stringify(imageData, null, 2)}
      </pre>
    </>
  )
}
