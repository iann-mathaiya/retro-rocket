import { toast } from "sonner"
import { Button } from "./ui/button"
import { Toaster } from "./ui/sonner"

export default function Toast() {
  function click() {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }
  return (
    <div>
    <Toaster />
    <Button onClick={click}>
      Give me a toast
    </Button>
  </div>
  )
}
