import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"



type SpinnerProps = {
  animateStyle?: string;
} & React.ComponentProps<"svg">

function Spinner({ animateStyle = 'animate-spin', className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon role="status" aria-label="Loading" className={cn("size-4", animateStyle, className)} {...props} />
  )
}

export { Spinner }
