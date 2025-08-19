"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { useState } from "react"


import { DEFAULT_PAGE } from "@/constants"
import { NewMeetingDialog } from "./new-meeting-dialogue"
export const MeetingsListHeader=()=>{
const[isDialogueopen,setIsDialogueopen]=useState(false);



    return(
        <>
      <NewMeetingDialog open={isDialogueopen} onOpenChange={setIsDialogueopen}/>
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xl">My Agents</h5>
                <Button onClick={()=>setIsDialogueopen(true)}> 
                    <PlusIcon/>
                    New Meeting
                </Button>
            </div>
            <div className="flex items-center gap-x-2 px-2">
                


            </div>

        </div>
          </>
    )
}