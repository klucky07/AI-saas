"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { NewAgentDialog } from "./new-agent-dialogue"

export const AgentsListHeader=()=>{
const[isDialogueopen,setIsDialogueopen]=useState(false);

    return(
        <>
      <NewAgentDialog open={isDialogueopen} onOpenChange={setIsDialogueopen}/>
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xl">My Agents</h5>
                <Button onClick={()=>setIsDialogueopen(true)}> 
                    <PlusIcon/>
                    New Agent
                </Button>
            </div>

        </div>
          </>
    )
}