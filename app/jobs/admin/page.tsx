'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/') // Redirect to home
  }, [router])

  return null // You can return null since nothing should render
}

export default Page
