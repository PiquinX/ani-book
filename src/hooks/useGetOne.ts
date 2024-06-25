'use client'

import { useSession } from "next-auth/react"

export async function useGetOne ({ getFunction, id }: { getFunction: Function, id: string }) {
  const session = useSession()

  const value = await getFunction({ id, email: session.data?.user?.email })

  return value
}