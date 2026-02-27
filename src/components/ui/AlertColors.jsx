import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangleIcon } from "lucide-react"

export function AlertColors({errorMsg}) {
  
  return (
    <Alert className="w-full sm:w-[80%] md:w-[30%] border-red-950 absolute right-12 bottom-12 bg-red-700 text-white m-0">
      <AlertTriangleIcon size={20} />
      <AlertTitle className="text-gray-400 ">Error Code. {errorMsg.status} </AlertTitle>
      <AlertDescription>
  
   {errorMsg.message}
      </AlertDescription>
    </Alert>
  )
}
