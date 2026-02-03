"use client"

import { toast } from "sonner"
import { Button } from "../../../components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const LogoutButton = () => {

    const router = useRouter()

    const handleLogout = async () => {
        await authClient.signOut({
        },
    {
        onSuccess: () => {
            router.push("/login")
        },
        onError: (ctx) => {
            toast.error(ctx.error.message)
        }
    }
    )
    }

  return (
    <Button variant="outline" onClick={() => authClient.signOut()}>Logout</Button>
  )
}

export default LogoutButton