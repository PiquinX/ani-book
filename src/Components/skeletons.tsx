export default function LoadingItemsSkeleton() {
    return (
        <>
            <div className='mb-5 w-[120px] h-[40px] rounded bg-[#111111] animate-pulse' />
            <div className="grid grid-cols-responsive gap-10">
                {
                    Array.apply(null, Array(6)).map((x, index) => (
                        <div key={index} className="rounded-sm border border-[#333333] w-full p-5 flex flex-col gap-5 animate-pulse">
                            <div className="w-20 h-[24px] rounded-sm bg-[#1a1a1a]" />
                            <div className="w-full h-[360px] md:h-[400px] rounded-sm bg-[#1a1a1a]" />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export function FormLoadingSkeleton() {
    return (
        <div className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 py-3 px-3 sm:px-10 left-0 flex items-start justify-center overflow-y-auto'>
            <div className='rounded-lg animate-appear-fast shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] border border-noir-blue bg-[#000000] opacity-100 w-full md:w-152 lg:w-3xl h-max my-10 duration-150 py-5 flex flex-col items-center justify-center relative'>
                <div className='w-full sm:w-[80%] flex flex-col py-10 animate-pulse'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex px-10 py-5 bar flex-col gap-5'>
                            {/* Title Area */}
                            <div className="w-[60%] h-12 bg-[#1a1a1a] rounded-sm mb-4" />

                            {/* Inputs */}
                            <div className='flex gap-2 flex-col'>
                                <div className="w-full h-10 bg-[#1a1a1a] rounded-sm" />
                                <div className='rounded self-center w-[70%] h-[300px] bg-[#1a1a1a] mt-2' />
                            </div>

                            {/* Rate Select */}
                            <div className='flex flex-col gap-2 mt-4'>
                                <div className="w-full h-10 bg-[#1a1a1a] rounded-sm" />
                            </div>

                            {/* Description */}
                            <div className='w-full h-[200px] bg-[#1a1a1a] rounded-sm mt-4' />
                        </div>

                        {/* Submit */}
                        <div className='bg-[#000000] w-full px-10 pt-4 pb-8'>
                            <div className="w-full h-12 bg-noir-blue/50 rounded-sm shadow-[0_0_15px_var(--noir-blue)]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function HomeLoadingSkeleton() {
    return (
        <div className="flex min-h-[75vh] flex-col items-center px-4 justify-center xs:p-12 w-full gap-12 xs:gap-24 mdl:gap-20 lg:gap-32 mdl:flex-row overflow-hidden">
            <PileSkeleton />
            <div className="hidden mdl:block w-px h-64 bg-zinc-800" />
            <PileSkeleton />
        </div>
    )
}

function PileSkeleton() {
    return (
        <div className="flex flex-col items-center gap-4 sm:gap-8 w-full max-w-md p-4 sm:p-8 rounded-3xl animate-pulse">
            {/* Title */}
            <div className="w-28 h-8 sm:h-10 rounded bg-[#1a1a1a]" />

            {/* Stacked poster placeholders */}
            <div className="relative w-32 h-48 xs:w-40 xs:h-60 sm:w-56 sm:h-80">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="absolute w-full h-full rounded-xl bg-[#1a1a1a] border border-[#333333]"
                        style={{
                            transform: `rotate(${(i - 1.5) * 5}deg) translateX(${(i - 1.5) * 6}px)`,
                            zIndex: 10 - i,
                            opacity: 1 - i * 0.15
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
