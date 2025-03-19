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
        <Drawer.Overlay className="sm:hidden flex justify-center fixed inset-0 bg-black/40" />
        <Drawer.Content className="block sm:hidden w-full sm:max-w-sm h-fit fixed bottom-0 -translate-x-1/2 left-1/2 outline-none">
          <div className='p-4 m-4 bg-white rounded-3xl'>
            <div className="pb-4 flex items-center justify-between border-b border-gray-200">
              <h2 className='text-xl sm:text-lg text-gray-600'>Options</h2>
              <Drawer.Close className='p-1.5 bg-gray-100 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
                  <title>Close Icon</title>
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
                </svg>
              </Drawer.Close>
            </div>

            <div className='mt-4 space-y-3'>
            <a href='/support' className='w-full p-3 flex items-center gap-3 text-lg sm:text-base text-orange-600 bg-orange-200/40 hover:bg-orange-200/65 hover:cursor-pointer rounded-xl transition-all duration-500 ease-in-out'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-orange-500">
                  <title>Question Icon</title>
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z" />
                </svg>
                <span>Need help shopping?</span>
              </a>

              <a href='/' className='w-full p-3 flex items-center gap-3 text-lg sm:text-base text-gray-900 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer rounded-xl transition-all duration-500 ease-in-out'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                  <title>Box Icon</title>
                  <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM5.49388 7.0777L12.0001 10.8444L18.5062 7.07774L12 3.311L5.49388 7.0777ZM4.5 8.81329V16.3469L11.0001 20.1101V12.5765L4.5 8.81329ZM13.0001 20.11L19.5 16.3469V8.81337L13.0001 12.5765V20.11Z" />
                </svg>
                <span>Products</span>
              </a>

              <a href='/blog' className='w-full p-3 flex items-center gap-3 text-lg sm:text-base text-gray-900 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer rounded-xl transition-all duration-500 ease-in-out'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                  <title>Article Icon</title>
                  <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z" />
                </svg>
                <span>Blog</span>
              </a>

              <a href='/about' className='w-full p-3 flex items-center gap-3 text-lg sm:text-base text-gray-900 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer rounded-xl transition-all duration-500 ease-in-out'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                  <title>Information Icon</title>
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" />
                </svg>
                <span> About </span>
              </a>

            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}