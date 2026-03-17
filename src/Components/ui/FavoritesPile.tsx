"use client"

import { useFavoritesPile } from "@/hooks/useFavoritesPile"
import { GeneralType } from "@/lib/definitions"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface FavoritesPileProps {
    items: GeneralType[]
    type: "animes" | "books"
    title: string
}

export default function FavoritesPile({ items, type, title }: FavoritesPileProps) {
    const { handleClick } = useFavoritesPile(type)

    return (
        <motion.div
            className="flex flex-col items-center gap-4 sm:gap-8 w-full max-w-md cursor-pointer p-4 sm:p-8 rounded-3xl border-transparent transition-colors duration-300 max-mdl:border-noir-blue/50 max-mdl:bg-black/50"
            onClick={handleClick}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
                rest: { boxShadow: "0px 4px 30px -5px transparent" },
                hover: { boxShadow: "0px 0px 40px -5px var(--noir-blue)" }
            }}
        >
            <motion.h2
                className="text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 max-mdl:text-white"
                variants={{
                    rest: { color: "#9ca3af" }, // text-gray-400
                    hover: { color: "#ffffff" } // text-white
                }}
            >
                {title}
            </motion.h2>

            <div className="relative w-32 h-48 xs:w-40 xs:h-60 sm:w-56 sm:h-80 flex items-center justify-center overflow-visible" style={{ perspective: "1000px" }}>
                {items.length === 0 ? (
                    <motion.div
                        className="absolute w-full h-full rounded-xl flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-zinc-900 to-black border border-dashed border-zinc-700 max-mdl:scale-100 max-mdl:opacity-100 max-mdl:border-[var(--noir-blue)]/40"
                        variants={{
                            rest: { opacity: 0.7, scale: 0.95, borderColor: "#3f3f46" },
                            hover: { scale: 1.05, opacity: 1, borderColor: "rgba(var(--noir-blue-rgb), 0.5)" }
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <motion.div
                            className="rounded-full border border-zinc-700 p-3"
                            variants={{
                                rest: { borderColor: "#3f3f46" },
                                hover: { borderColor: "var(--noir-blue)" }
                            }}
                        >
                            <Plus className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-500 max-mdl:text-[var(--noir-blue)] shrink-0" />
                        </motion.div>
                        <span className="font-bold text-xs sm:text-base tracking-[0.25em] uppercase text-zinc-500 transition-colors duration-500 max-mdl:text-zinc-300">
                            Get Started
                        </span>
                        <span className="text-[10px] sm:text-xs text-zinc-600 transition-colors duration-500 max-mdl:text-zinc-400">
                            Add your first {type === 'animes' ? 'anime' : 'book'}
                        </span>
                    </motion.div>
                ) : (
                    items.map((item, index) => {
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 896; // mdl breakpoint approx
                        const rot = (index - (items.length - 1) / 2) * 15;
                        const x = (index - (items.length - 1) / 2) * 20;
                        const y = Math.abs(index - (items.length - 1) / 2) * 5;

                        return (
                            <motion.div
                                key={item.id}
                                className="absolute w-full h-full rounded-xl overflow-hidden shadow-2xl origin-bottom border border-zinc-800 bg-zinc-900"
                                style={{ zIndex: 10 - index }}
                                variants={{
                                    rest: {
                                        rotate: isMobile ? rot : 0,
                                        x: isMobile ? x : 0,
                                        y: isMobile ? y : 0,
                                        scale: 1,
                                        filter: isMobile ? "grayscale(0%)" : "grayscale(100%)"
                                    },
                                    hover: {
                                        rotate: rot,
                                        x: x,
                                        y: y,
                                        scale: 1.05,
                                        filter: "grayscale(0%)"
                                    }
                                }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                                <Image
                                    src={item.poster}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 640px) 8rem, (max-width: 768px) 10rem, 14rem"
                                    className="object-cover"
                                />
                            </motion.div>
                        )
                    })
                )}
            </div>
        </motion.div >
    )
}
