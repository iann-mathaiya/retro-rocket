import { Drawer } from 'vaul';

export default function FloatingMobileNavigation() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className='p-3 block sm:hidden fixed bottom-4 right-4 bg-gray-200 shadow-lg rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-900">
          <title>Magic Icon</title>
          <path d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.893489 20.2942 0.893489 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 11.6765 19.9809 11.3579 19.9437 11.0452L21.9298 10.8094C21.9762 11.2002 22 11.5975 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.8614 2 13.6987 2.10914 14.4983 2.31487L14 4.25179C13.3618 4.0876 12.6919 4 12 4ZM13 11H16L11 18V13H8L13 6V11Z" />
        </svg>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="block sm:hidden fixed inset-0 bg-black/40" />
        <Drawer.Content className="block sm:hidden p-4 bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none rounded-t-2xl">
          <div className="pb-2 flex items-center justify-between border-b border-gray-200">
            <h2 className='text-xl text-gray-600'>Options</h2>
            <Drawer.Close className='p-1.5 bg-gray-200 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
                <title>Close Icon</title>
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
              </svg>
            </Drawer.Close>
          </div>

          <div className=' mt-4'>
            <button type="button" className='w-full'>
              Products
            </button>
            <button type="button" className='w-full'>
              Need help shopping?
            </button>
            <button type="button" className='w-full'>
              Blog
            </button>
            <button type="button" className='w-full'>
              About
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}