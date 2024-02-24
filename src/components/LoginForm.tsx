import { z } from "astro/zod"
import FormInput from "./FormInput"
import { Button } from "./ui/button"
import type { FormEvent } from "react"

const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function SignUpForm() {

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch("/api/login", {
      method: "POST",
      body: formData,
    })

    console.log(response)

    if (response.status === 200) return (window.location.href = "/")
  }
  return (
    <form
      onSubmit={handleSignUp}
      className='my-16 flex flex-col items-center space-y-4'
    >
      <h1 className='text-base text-gray-700 font-semibold'>Login</h1>

      <FormInput name='email_address' label='Email Address' type='email' />
      <FormInput name='password' label='Password' type='password' />

      <Button type='submit'>Continue</Button>

      <a
        href='/signup'
        className='text-sm text-gray-500 underline underline-offset-2 hover:text-orange-500'
      >
        Create account
      </a>
    </form>
  )
}
