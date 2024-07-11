"use client"

import { Button } from "@/Components/ui/button"
import { useToast } from "@/Components/ui/use-toast"

export function ToastSimple() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
