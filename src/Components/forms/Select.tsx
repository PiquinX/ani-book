import { ReactNode, useState, useId } from 'react'
import { useSelect } from '@/hooks/useSelect'

interface Props {
  options: string[]
  defaultValue: string
  name: string
  describedBy?: string
  width?: string
}

export function Select(
  { options, defaultValue, name, describedBy, width = 'w-[200px] sm:w-[225px]' }: Props
): ReactNode {
  const selectId = useId()
  // The states contains if the select it's shown or not.
  const { isShowing, setIsShowing } = useSelect(selectId)
  const [value, setValue] = useState(defaultValue)

  // We apply styles depending on the isShowing state.
  const selectClass = isShowing ? 'pointer-events-auto top-full opacity-100' : 'pointer-events-none top-1/2 opacity-0'
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
  }

  return (
    <div className={`relative text-sm select-none sm:text-base ${width}`}>
      <div
        id={selectId}
        data-dropdown-button
        onClick={handleClick}
        className={`${buttonClass} ${width} cursor-pointer font-bold duration-75 rounded border flex py-1 pr-8 relative px-4 before:absolute before:duration-150 before:w-[.65rem] before:h-[.65rem] before:border-b-2 before:border-r-2 before:right-3`}
      >
        <span className='truncate w-full pointer-events-none select-none overflow-hidden'>
          {value}
        </span>
      </div>
      <input className='hidden' aria-describedby={describedBy} value={value} name={name} />

      <div className={`${selectClass} ${width} min-w-max duration-75 absolute bg-[#000000] text-gray-300 font-bold border border-noir-blue shadow-[0_0_25px_5px_var(--noir-blue,rgba(0,0,255,0.6))] z-50 rounded `}>
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
