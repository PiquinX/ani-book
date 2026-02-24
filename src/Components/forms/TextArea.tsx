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
        className={`${border ? 'border border-[#333333]' : ''} ${style} text-area w-full h-full px-3 py-2 duration-75 text-md text-white bg-transparent rounded-sm outline-none 
                        focus:border-noir-blue focus:ring-1 focus:ring-noir-blue focus:shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] transition-all
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
        className={`text-sm select-none absolute px-1.5 duration-150 pointer-events-none left-3 -top-[14px] 
                        text-gray-500 bg-[#000000] border border-[#333333] rounded-[4px]
                        peer-focus:text-noir-blue peer-focus:text-sm peer-focus:-top-[14px] peer-focus:bg-[#000000] peer-focus:border-noir-blue peer-focus:shadow-[0_-5px_15px_-3px_rgba(0,0,255,0.6)]
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:border-transparent peer-placeholder-shown:shadow-none peer-placeholder-shown:top-[.37rem]`}
      >
        {placeholder}
      </label>
    </div>
  )
}

export default TextArea
