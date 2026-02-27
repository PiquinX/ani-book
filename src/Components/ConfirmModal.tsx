import { useEffect, useState } from 'react'

interface ConfirmModalProps {
    show: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isProcessing?: boolean;
}

export default function ConfirmModal({ show, title, message, onConfirm, onCancel, isProcessing }: ConfirmModalProps) {
    const [renderState, setRenderState] = useState(false)

    useEffect(() => {
        if (show) {
            const initialFrame = requestAnimationFrame(() => {
                setRenderState(true)
            })
            return () => cancelAnimationFrame(initialFrame)
        } else {
            setRenderState(false)
        }
    }, [show])

    if (!show) return null

    return (
        <div
            className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300 ${renderState ? 'bg-black/80 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}`}
        >
            <div
                className={`bg-[#000000] border border-[#FF1111] rounded-lg p-8 shadow-[0_0_25px_5px_rgba(255,17,17,0.4)] flex flex-col items-center gap-4 text-center mx-4 transition-all duration-300 transform w-full max-w-sm ${renderState ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-8 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-[#FF1111] text-2xl font-bold tracking-wide">{title}</h2>
                <p className="text-gray-300 text-base">{message}</p>

                <div className="flex gap-4 mt-4 w-full">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isProcessing}
                        className="flex-1 px-4 cursor-pointer py-2 border border-[#333333] rounded text-gray-400 hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_var(--noir-blue)] hover:bg-noir-blue/20 transition-all disabled:opacity-50 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="flex-1 px-4 cursor-pointer py-2 bg-[#FF1111]/10 border border-[#FF1111] rounded text-[#FF1111] hover:bg-[#FF1111] hover:text-white hover:shadow-[0_0_15px_rgba(255,17,17,0.6)] transition-all disabled:opacity-50 font-semibold"
                    >
                        {isProcessing ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    )
}
