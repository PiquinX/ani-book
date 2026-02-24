import { createPortal } from 'react-dom'
import { LogOut } from 'lucide-react'
import { useLogOutModal } from '@/hooks/useLogOutModal';

interface LogoutModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function LogoutModal({ show, onClose, onConfirm }: LogoutModalProps) {
    const { mounted } = useLogOutModal({ onClose, show })

    if (!show || !mounted) return null

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <div
                className="bg-[#000000] border border-noir-blue rounded-lg p-8 shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] flex flex-col items-center gap-6 text-center mx-4 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-white text-xl font-semibold tracking-wide">
                    Are you sure you want to log out?
                </h2>

                <div className="flex gap-4 w-full justify-center mt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 cursor-pointer px-4 py-2 rounded-md font-semibold text-gray-300 bg-transparent border border-gray-600 hover:border-noir-blue hover:text-white hover:bg-noir-blue/20 hover:shadow-[0_0_15px_rgba(0,0,255,0.8)] transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 flex gap-2 items-center justify-center cursor-pointer px-4 py-2 rounded-md font-semibold text-white bg-transparent border border-gray-600 hover:border-red-500 hover:bg-red-600/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.8)] transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}
