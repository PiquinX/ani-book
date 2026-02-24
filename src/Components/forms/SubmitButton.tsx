'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

interface SubmitButtonProps {
    children: React.ReactNode;
}

export default function SubmitButton({ children }: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={`flex items-center justify-center gap-2 bg-transparent border border-[#333333] rounded px-3 py-2 font-medium transition-all w-full
                ${pending
                    ? 'text-gray-400 bg-[#333333] cursor-not-allowed'
                    : 'text-gray-500 cursor-pointer hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] hover:bg-noir-blue/20'
                }`}
        >
            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin text-noir-blue" />
                    <span>Processing...</span>
                </>
            ) : (
                children
            )}
        </button>
    )
}
