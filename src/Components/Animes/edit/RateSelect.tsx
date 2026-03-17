import { ReactNode, useState } from 'react'
import { useSelect } from '@/hooks/useSelect'
import { getRate, getRateTier } from '@/lib/utils'

interface Props {
  id: string
  options: string[]
  defaultValue: number
  name: string
  describedBy?: string
  width?: string
  type?: 'anime' | 'book' | 'movie' | 'serie'
}

export function RateSelect(
  { id, options, defaultValue, name, describedBy, width = 'w-[200px] sm:w-[225px]', type }: Props
): ReactNode {
  // The states contains if the select it's shown or not.
  const { isShowing, setIsShowing } = useSelect(id)
  const [value, setValue] = useState(getRateTier(defaultValue))
  const [inputValue, setInputValue] = useState(defaultValue)

  // We apply styles depending on the isShowing state.
  const selectClass = isShowing ? 'pointer-events-auto top-full mb-[2px] opacity-100' : 'pointer-events-none top-1/2 opacity-0'
  const buttonClass = isShowing ? 'border-noir-blue text-white before:border-white before:rotate-[-135deg] before:top-[.78rem] bg-transparent' : 'border-[#333333] text-gray-500 before:border-gray-500 font-bold before:rotate-45 before:top-[.45rem] sm:before:top-[.55rem]'

  // It changes the state of isShowing.
  const handleClick = () => setIsShowing(!isShowing)

  // Updates the selectValue and closes the select.
  const handleOption = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement
    const newValue = target.textContent

    if (!newValue) return

    setIsShowing(false)

    setValue(newValue)
    setInputValue(getRate(newValue))
  }

  return (
    <div className={`relative text-sm select-none sm:text-base ${width}`}>
      <div
        id={id}
        onClick={handleClick}
        className={`${buttonClass} ${width} cursor-pointer font-bold duration-75 rounded border flex py-1 pr-8 relative px-4 before:absolute before:duration-150 before:w-[.65rem] before:h-[.65rem] before:border-b-2 before:border-r-2 before:right-3`}
      >
        <span className='truncate w-full pointer-events-none select-none overflow-hidden'>
          {value}
        </span>
      </div>
      <input className='hidden' aria-describedby={describedBy} value={inputValue} name={name} />

      <div className={`${selectClass} ${width} z-[100] min-w-max duration-75 absolute bg-[#000000] text-gray-300 font-bold border border-noir-blue shadow-[0_0_25px_5px_var(--noir-blue)] rounded `}>
        {
          options.map((option, index) => (
            <div
              onClick={handleOption}
              key={index}
              className='w-full px-4 py-1 text-left cursor-pointer text-gray-400 hover:text-white hover:bg-noir-blue/20 transition-colors'
            >
              {option}
            </div>
          ))
        }
      </div>
    </div>
  )
}
