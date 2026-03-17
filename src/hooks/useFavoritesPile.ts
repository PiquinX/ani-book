import { useRouter } from "next/navigation"
import { useLoader } from "@/context/LoaderContext"

export function useFavoritesPile(type: "animes" | "books") {
    const router = useRouter()
    const { setIsLoading } = useLoader()

    const handleClick = () => {
        setIsLoading(true)
        router.push(`/${type}`)
    }

    return {
        handleClick
    }
}
