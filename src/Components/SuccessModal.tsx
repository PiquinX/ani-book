import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { SuccessModalProps } from '@/lib/definitions'

export default function SuccessModal({ show, message, onClose }: SuccessModalProps) {
    const [renderState, setRenderState] = useState(false)

    useEffect(() => {
        if (show) {
            // Trigger animation after initial render
            const initialFrame = requestAnimationFrame(() => {
                setRenderState(true)
            })
            const timer = setTimeout(() => {
                setRenderState(false)
                setTimeout(onClose, 300) // Call onClose after exit animation completes
            }, 1100)
            return () => {
                cancelAnimationFrame(initialFrame)
                clearTimeout(timer)
            }
        } else {
            setRenderState(false)
        }
    }, [show, onClose])

    if (!show) return null

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${renderState ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}`}
            onClick={() => {
                setRenderState(false)
                setTimeout(onClose, 300)
            }}
        >
            <div
                className={`bg-[#000000] border border-noir-blue rounded-lg p-8 shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] flex flex-col items-center gap-4 text-center mx-4 transition-all duration-300 transform ${renderState ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-8 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <CheckCircle className="text-noir-blue w-12 h-12 mb-2" />
                <h2 className="text-white text-xl font-semibold tracking-wide">{message}</h2>
            </div>
        </div>
    )
}
