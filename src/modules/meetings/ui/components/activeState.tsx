import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { BanIcon, VideoIcon } from "lucide-react"
import Link from "next/link"

interface Props{
    meetingId:string;
   
}

export const ActiveState=({
    meetingId,
   
} :Props)=>{
return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center" >
        <EmptyState  
        image='/upcoming.svg'
        title="not started yet"
        description="onece you start this meeting a summary will appear"
        />
        <div className="flex w-full flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">

 <Button asChild className=" w-full lg:w-auto">
    <Link href={`/call/${meetingId}`}>
    <VideoIcon/>
   Join meeting
    </Link>
    
 </Button>


        </div>

    </div>
)
}