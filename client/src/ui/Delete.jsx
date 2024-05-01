  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { PiDotsThreeVertical } from "react-icons/pi"
  
  export function Delete() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button><PiDotsThreeVertical className=' hover:cursor-pointer text-2xl' /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
          <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  