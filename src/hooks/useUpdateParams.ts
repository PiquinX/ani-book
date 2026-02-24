import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

export function useUpdateParams () {
    const params = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    console.log(pathname)

    const updateParams = (key:string, value:string) => {
        const newParams = new URLSearchParams(params.toString())
      newParams.set(key, value)
  
      router.push(pathname + '?' + newParams.toString())
    }

    return { updateParams }
}
