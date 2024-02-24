type FormInputProps = {
    label: string
    name: string
    type?: string
    validationError?: string
  }
  
  export default function FormInput({ label, name, type = 'text', validationError }: FormInputProps) {
    return (
      <div className='w-full sm:w-2/4'>
        <label
          htmlFor={name}
          className='block text-sm font-medium leading-6 text-gray-600'
        >
          {label}
        </label>
        <div className='w-full relative mt-1 rounded-md shadow-sm'>
          <input
            type={type}
            name={name}
            id={name}
            placeholder={label}
            className='block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-500 outline-none sm:text-sm sm:leading-6'
          />
        </div>
        <p className="text-xs text-red-500 font-medium">{validationError}</p>
      </div>
    )
  }