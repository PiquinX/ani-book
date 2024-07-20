import { useId } from 'react'

interface Props {
    name: string
    placeholder: string
    type: string
    describedBy: string
    defaultValue: string
    border: boolean
    style: string
}

// Should I use React.FC<Props> or { name, placeholder, type = 'text', handleChange } : Props,
// or simply { name, placeholder, type = 'text', handleChange }:
// { name: string, placeholder: string, type: string, handleChange: () => void }
const TextArea: React.FC<Partial<Props>> = (
  { name, placeholder, describedBy = '', defaultValue = '', border = true, style = '' }
) => {
  const id = useId()

  return (
        <div className="relative h-full">
            <textarea
                className={`${border ? 'outline-gray-500' : ''} ${style} text-area w-full h-full px-3 py-2 outline-1 duration-75 text-md text-black  rounded-sm outline-none 
                        focus:outline-blue-700 focus:outline-2
                        placeholder:pointer-events-none placeholder:text-transparent placeholder:select-none
                        peer`}
                name={name}
                id={id}
                placeholder={placeholder}
                aria-describedby={describedBy}
                defaultValue={defaultValue}
            />
            <label
                htmlFor={id}
                className={`text-sm select-none absolute px-1 text-gray-400 duration-150 bg-white pointer-events-none left-3 -top-[.87rem] 
                        peer-focus:text-blue-700 peer-focus:text-sm peer-focus:-top-4 
                        peer-placeholder-shown:text-base peer-placeholder-shown:left-3 peer-placeholder-shown:top-[.37rem]`}
            >
            {placeholder}
            </label>
        </div>
  )
}

export default TextArea
