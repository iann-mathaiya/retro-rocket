import { type FormEvent } from "react"
import { LogOutIcon } from "lucide-react"

export default function LogoutForm() {
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await fetch("/api/logout", {
      method: "POST",
    })

    if (response.status === 200) return (window.location.href = "/")
  }
  return (
    <div>
      <form onSubmit={submit}>
        <button
          type='submit'
          className='p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded'
        >
          <LogOutIcon size={18} />
        </button>
      </form>
    </div>
  )
}
