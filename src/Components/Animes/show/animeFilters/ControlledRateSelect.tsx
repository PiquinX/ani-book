import { ReactNode } from 'react'
import { useSelect } from '@/hooks/useSelect'

interface Props {
    id: string
    options: string[]
    rateValue: string
    name: string
    describedBy?: string
    width?: string
    onOptionChange (newValue: string): void
}

export function ControlledRateSelect (
  { id, options, rateValue, name, describedBy, width = 'w-[200px] sm:w-[225px]', onOptionChange }: Props
): ReactNode {
  // The states contains if the select it's shown or not.
  const { isShowing, setIsShowing } = useSelect(id)

  // We apply styles depending on the isShowing state.
  const selectClass = isShowing ? 'pointer-events-auto top-full opacity-100' : 'pointer-events-none top-1/2 opacity-0'
  const buttonClass = isShowing ? 'before:rotate-[-135deg] before:top-[.78rem] text-white before:border-white bg-blue-700' : 'text-blue-700 before:border-blue-700 font-bold before:rotate-45 before:top-[.45rem] sm:before:top-[.55rem]'

  // It changes the state of isShowing.
  const handleClick = () => setIsShowing(!isShowing)

  // Updates the selectValue and closes the select.
  const handleOption = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement
    const newValue = target.textContent

    if (!newValue) return

    setIsShowing(false)

    onOptionChange(newValue) 
  }

  return (
    <div className={`relative text-sm select-none sm:text-base ${width}`}>
      <div
        id={id}
        data-dropdown-button
        onClick={handleClick}
        className={`${buttonClass} ${width} cursor-pointer font-bold border-blue-900 duration-75 rounded border-2 flex py-1 pr-8 relative px-4 before:absolute before:duration-150 before:w-[.65rem] before:h-[.65rem] before:border-b-2 before:border-r-2 before:right-3`}
      >
        <span className='truncate w-full pointer-events-none select-none overflow-hidden'>
          {rateValue}
        </span>
      </div>
      <input className='hidden' aria-describedby={describedBy} value={rateValue} name={name} />

      <div className={`${selectClass} ${width} min-w-max duration-75 absolute bg-white text-blue-700 font-bold border-2 border-blue-700 shadow-select z-50 rounded `}>
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
