import axios from "axios"
import { z } from "astro/zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "./ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUploader } from "./ImageUploader"

const productSchema = z.object({
  discount: z.number().optional(),
  picture: z.string().min(1, { message: "Attach a product image" }),
  category: z.string().min(1, { message: "Select product category" }),
  price: z.number().min(1, { message: "Price must be at least $1.00" }),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters",
  }),
})

type ProductSchema = z.infer<typeof productSchema>

export default function AddProductModal() {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: 0,
      title: "",
      picture: "",
      category: "",
      description: "",
    },
  })

  async function handleSignUp(values: ProductSchema) {
    const data = {
      //   password: values.password,
      //   emailAddress: values.email_address,
    }

    const response = await axios.post("/api/login", data)

    if (response.status === 200) return (window.location.href = "/")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link' className='w-fit text-xs text-gray-600'>
          Add Product +
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-screen-md'>
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a product to your inventory
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className='mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4'
            >
              <div><ImageUploader /></div>

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Computer-1' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a category' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value='apple'>Apple</SelectItem>
                              <SelectItem value='banana'>Banana</SelectItem>
                              <SelectItem value='blueberry'>
                                Blueberry
                              </SelectItem>
                              <SelectItem value='grapes'>Grapes</SelectItem>
                              <SelectItem value='pineapple'>
                                Pineapple
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Describe your product here.'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className='col-span-2'>
                <Button type='submit'>Save new product</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
