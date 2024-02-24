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

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  emailAddress: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      username: "",
      emailAddress: "",
    },
  })

  async function handleSignUp(formData: z.infer<typeof formSchema>) {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(formData),
    })

    console.log(response)

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
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Cosmic Explorer' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='emailAddress'
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
                  <Input type="password" placeholder='rfr%R$5/4*?' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Sign Up</Button>
        </form>
      </Form>

      <a href='/login' className="flex justify-center">
        <Button variant='link' className="w-2/3 max-w-sm mx-auto">Access my account instead</Button>
      </a>
    </>
  )
}
