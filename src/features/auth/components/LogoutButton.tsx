"use client"

import { toast } from "sonner"
import { Button } from "../../../components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Loader2Icon } from "lucide-react"

const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const handleLogout = () => {
        startTransition(async () => {
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
        })
    }

  return (
    <Button variant="outline" disabled={isPending} onClick={handleLogout}>{isPending ? <Loader2Icon className="size-4 animate-spin" /> : "Logout"}</Button>
  )
}

export default LogoutButton