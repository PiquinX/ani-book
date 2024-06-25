'use client'

import { useSession } from "next-auth/react"

export async function useGet ({ getFunction }: { getFunction: Function }) {
  const session = useSession()

  const value = await getFunction(session.data?.user?.email)

  return value
}