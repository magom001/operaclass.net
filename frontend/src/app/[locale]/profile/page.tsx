"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation" // Corrected import

export default function ProfilePage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin") // Or use the localized path if available
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {session?.user?.email}!</p>
      {/* Add more profile information here */}
    </div>
  )
}
