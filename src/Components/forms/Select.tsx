import { ReactNode, useState } from 'react'
import { useSelect } from '@/hooks/useSelect'
import { ClickEvent } from '@/lib/definitions'

interface Props {
    options: string[]
    defaultValue: string
    name: string
    describedBy: string
}

export function Select ({ options, defaultValue, name, describedBy }: Props): ReactNode {
  // The states contains if the select it's shown or not.
  const { isShowing, setIsShowing } = useSelect()
  const [value, setValue] = useState(defaultValue)

  // We apply styles depending on the isShowing state.
  const selectClass = isShowing ? 'pointer-events-auto top-full opacity-100' : 'pointer-events-none top-1/2 opacity-0'
  const buttonClass = isShowing ? 'before:rotate-[-135deg] before:top-[.78rem] text-white before:border-white bg-blue-700' : 'text-blue-700 before:border-blue-700 font-bold before:rotate-45 before:top-[.45rem] sm:before:top-[.55rem]'

  // It changes the state of isShowing.
  const clickHandle = () => setIsShowing(!isShowing)

  // Updates the selectValue and closes the select.
  const handleOption = (e: ClickEvent) => {
    setIsShowing(false)
    setValue(e.target.textContent)
  }

  return (
    <div className='relative text-sm select-none sm:text-base'>
      <div
        data-dropdown-button
        onClick={clickHandle}
        className={`${buttonClass} cursor-pointer w-[200px] sm:w-[225px] font-bold border-blue-900 duration-75 rounded border-2 flex py-1 pr-8 relative px-4 before:absolute before:duration-150 before:w-[.65rem] before:h-[.65rem] before:border-b-2 before:border-r-2 before:right-3`}
      >
          {value}
      </div>
      <input className='hidden' aria-describedby={describedBy} value={value} name={name} />

      <div className={`${selectClass} duration-75 absolute bg-white text-blue-700 font-bold border-2 border-blue-700 shadow-select z-50 rounded w-[200px] sm:w-[225px] `}>
        {
          options.map((option, index) => (
            <div
              onClick={handleOption}
              key={index}
              className='w-full px-4 py-1 text-left cursor-pointer hover:text-white hover:bg-blue-700'
            >
              {option}
            </div>
          ))
        }
      </div>
    </div>
  )
}
