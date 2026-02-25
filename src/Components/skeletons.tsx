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
            <div className='rounded-lg shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] border border-noir-blue bg-[#000000] opacity-100 w-full md:w-152 lg:w-3xl h-max my-10 duration-150 py-5 flex flex-col items-center justify-center relative'>
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
