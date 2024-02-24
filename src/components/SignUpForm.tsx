import { z } from "astro/zod"
import FormInput from "./FormInput"
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
      username: "",
      emailAddress: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
      {/* <form
        onSubmit={handleSignUp}
        className='my-16 flex flex-col items-center space-y-4'
      >
        <h1 className='text-base text-gray-700 font-semibold'>Sign up</h1>

        <FormInput name='username' label='Username' />
        <FormInput name='email_address' label='Email Address' type='email' />
        <FormInput name='password' label='Password' type='password' />

        <Button type='submit'>Create Account</Button>
        <a
          href='/login'
          className='text-sm text-gray-500 underline underline-offset-2 hover:text-orange-500'
        >
          Login to my account instead
        </a>
      </form> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto my-16 max-w-sm space-y-4'
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
                  <Input placeholder='rfr%R$5/4*?' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  )
}
