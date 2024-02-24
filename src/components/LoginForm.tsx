import axios from "axios"
import { z } from "astro/zod"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const signUpSchema = z.object({
  email_address: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export default function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      password: "",
      email_address: "",
    },
  })

  async function handleSignUp(values: SignUpSchema) {

    const data = {
      password: values.password,
      emailAddress: values.email_address,
    }

    const response = await axios.post("/api/login", data)

    if (response.status === 200) return (window.location.href = "/")
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className='mx-auto mt-16 mb-2 max-w-sm space-y-4'
        >

          <FormField
            control={form.control}
            name='email_address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder='hi@retrorocket.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='rfr%R$5/4*?' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Authenticate</Button>
        </form>
      </Form>

      <a href='/signup' className='flex justify-center'>
        <Button variant='link' className='w-2/3 max-w-sm mx-auto'>
          Open new account
        </Button>
      </a>
    </>
  )
}
