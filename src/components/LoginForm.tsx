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
  emailAddress: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      emailAddress: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  // async function handleSignUp(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault()
  //   const formData = new FormData(e.target as HTMLFormElement)

  //   const data = Object.fromEntries(formData)

  //   const validatedForm = formSchema.safeParse(data)

  //   console.log(validatedForm)

  //   // const response = await fetch("/api/signup", {
  //   //   method: "POST",
  //   //   body: formData,
  //   // })

  //   // console.log(response)

  //   // if (response.status === 200) return (window.location.href = "/")
  // }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto mt-16 mb-2 max-w-sm space-y-4'
        >
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
          <Button type='submit'>Submit</Button>
        </form>
      </Form>

      <a href='/signup' className="flex justify-center">
        <Button variant='link' className="w-2/3 max-w-sm mx-auto">Create Account</Button>
      </a>
    </>
  )
}
