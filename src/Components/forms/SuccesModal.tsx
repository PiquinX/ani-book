import { Check } from "lucide-react";

interface Props {
    show: boolean
    message: string
}

const SuccesModal: React.FC<Props> = ({ show, message }) => {
  return (
    <>
    {
      show &&
        <div
          className='w-full bg-[#0001] backdrop-blur h-full fixed top-0 px-10 left-0 flex items-center justify-center'
        >
          <div className='h-44 w-max gap-6 animate-appear-fast duration-150 px-20 text-2xl absolute  rounded-lg border bg-white flex items-center justify-center'
          >
              <Check className="text-white p-2 rounded-full bg-green-400 w-12 h-12 shrink-0" />
              {message}
          </div>
        </div>
    }
    </>
  )
}

export default SuccesModal
