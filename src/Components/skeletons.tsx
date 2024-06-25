export default function LoadingItemsSkeleton () {
  return (
    <>
        <div className='mb-5 w-[120px] h-[40px] rounded bg-slate-400' />
        <div className="grid grid-cols-responsive gap-10" >
            {
                Array.apply(null, Array(6)).map((x, index) => (
                    <div key={index} className="rounded border w-72 p-5 flex flex-col gap-5">
                        <div className="w-20 h-[24px] rounded-md bg-slate-400" />
                        <div className="w-full h-[350px] rounded bg-slate-400" />
                    </div>
                ))
            }
        </div>
    </>
  )
}
