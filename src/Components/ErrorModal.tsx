import { useEffect, useState } from 'react'
import { XCircle } from 'lucide-react'
import { ErrorModalProps } from '@/lib/definitions'

export default function ErrorModal({ show, message, onClose }: ErrorModalProps) {
    const [renderState, setRenderState] = useState(false)

    useEffect(() => {
        if (show) {
            // Trigger animation after initial render
            const initialFrame = requestAnimationFrame(() => {
                setRenderState(true)
            })
            // Auto close after 3 seconds
            const timer = setTimeout(() => {
                setRenderState(false)
                setTimeout(onClose, 300) // Call onClose after exit animation completes
            }, 3000)
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
                className={`bg-[#000000] border border-red-900 rounded-lg p-8 shadow-[0_0_25px_5px_rgba(255,0,0,0.4)] flex flex-col items-center gap-4 text-center mx-4 transition-all duration-300 transform ${renderState ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-8 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <XCircle className="text-red-500 w-12 h-12 mb-2" />
                <h2 className="text-white text-xl font-semibold tracking-wide">{message}</h2>
            </div>
        </div>
    )
}
