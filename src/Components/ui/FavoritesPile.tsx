"use client"

import { useRouter } from "next/navigation"
import { useLoader } from "@/context/LoaderContext"
import { Plus } from "lucide-react"

interface FavoriteItem {
    id: string
    poster: string
    title: string
}

interface FavoritesPileProps {
    items: FavoriteItem[]
    type: "animes" | "books"
    title: string
}

export default function FavoritesPile({ items, type, title }: FavoritesPileProps) {
    const router = useRouter()
    const { setIsLoading } = useLoader()

    const handleClick = () => {
        setIsLoading(true)
        router.push(`/${type}`)
    }

    return (
        <div className="flex flex-col items-center gap-4 sm:gap-8 w-full max-w-md cursor-pointer group p-4 sm:p-8 rounded-3xl transition-all duration-300 border-transparent max-mdl:border-noir-blue/50 max-mdl:shadow-[0_4px_30px_-5px_var(--noir-blue)] max-mdl:bg-black/50 mdl:hover:border-noir-blue/50 mdl:hover:shadow-[0_0_40px_-5px_var(--noir-blue)] mdl:hover:bg-black/50" onClick={handleClick}>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-400 transition-all duration-300 max-mdl:text-white mdl:group-hover:text-white">
                {title}
            </h2>

            <div className="relative w-32 h-48 xs:w-40 xs:h-60 sm:w-56 sm:h-80 perspective-1000 flex items-center justify-center overflow-visible">
                {items.length === 0 ? (
                    // Empty state fallback – premium Noir card
                    <div className={`
                        absolute w-full h-full rounded-xl flex flex-col items-center justify-center gap-3
                        bg-gradient-to-b from-zinc-900 to-black
                        border border-dashed border-zinc-700 transition-all duration-500
                        max-mdl:scale-100 max-mdl:opacity-100 max-mdl:border-[var(--noir-blue)]/40
                        mdl:opacity-70 mdl:scale-95
                        mdl:group-hover:scale-105
                    `}>
                        <div className="rounded-full border border-zinc-700 p-3 transition-all duration-500">
                            <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-500 transition-colors duration-500 max-mdl:text-[var(--noir-blue)] mdl:group-hover:text-[var(--noir-blue)]" />
                        </div>
                        <span className="font-bold text-xs sm:text-base tracking-[0.25em] uppercase text-zinc-500 transition-colors duration-500 max-mdl:text-zinc-300 mdl:group-hover:text-zinc-300">
                            Get Started
                        </span>
                        <span className="text-[10px] sm:text-xs text-zinc-600 transition-colors duration-500 max-mdl:text-zinc-400 mdl:group-hover:text-zinc-400">
                            Add your first {type === 'animes' ? 'anime' : 'book'}
                        </span>
                    </div>
                ) : (
                    items.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className={`
                  absolute w-full h-full rounded-xl overflow-hidden shadow-2xl origin-bottom
                  transition-all duration-500 ease-out border border-zinc-800
                  max-mdl:[transform:rotate(var(--hover-rot))_translateX(var(--hover-x))_translateY(var(--hover-y))]
                  mdl:group-hover:[transform:rotate(var(--hover-rot))_translateX(var(--hover-x))_translateY(var(--hover-y))]
                `}
                                style={{
                                    '--hover-rot': `${((index - (items.length - 1) / 2) * 15)}deg`,
                                    '--hover-x': `${((index - (items.length - 1) / 2) * 20)}px`,
                                    '--hover-y': `${Math.abs(index - (items.length - 1) / 2) * 5}px`,
                                    zIndex: 10 - index
                                } as React.CSSProperties}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.poster}
                                    alt={item.title}
                                    className={`
                    w-full h-full object-cover transition-all duration-500
                    max-mdl:grayscale-0 mdl:grayscale mdl:group-hover:grayscale-0
                  `}
                                />
                            </div>
                        )
                    })
                )}
            </div>
        </div >
    )
}
