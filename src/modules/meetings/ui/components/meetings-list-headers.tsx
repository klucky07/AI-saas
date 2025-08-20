"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { useState } from "react"

import { StatusFilter } from "./status-filter"
import { DEFAULT_PAGE } from "@/constants"
import { NewMeetingDialog } from "./new-meeting-dialogue"
import { MeetingsSearchFilter } from "./meetings-search-filter"
import { AgentIdFilter } from "./agent-id-filter"
import { useMeetingFilters } from "../../hooks/use-meetingfilter"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
export const MeetingsListHeader=()=>{
const[isDialogueopen,setIsDialogueopen]=useState(false);
const[filters,setFilters] =useMeetingFilters();

const isAnyFilterModified =
!!filters.status || !!filters.search || !!filters.agentId;

const onClearFilters =()=>[
    setFilters({

        status:null,
        agentId:"",
        search:"",
        page:1,
    })
]


    return(
        <>
      <NewMeetingDialog open={isDialogueopen} onOpenChange={setIsDialogueopen}/>
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xl">My Meetings</h5>
                <Button onClick={()=>setIsDialogueopen(true)}> 
                    <PlusIcon/>
                    New Meeting
                </Button>
            </div>
            <ScrollArea>
            <div className="flex items-center gap-x-2 p-1">
                
<MeetingsSearchFilter/>
           <StatusFilter/>     
<AgentIdFilter />
{isAnyFilterModified && (
    <Button
    variant="outline" onClick={onClearFilters}
    >
<XCircleIcon className="size-4" />
    </Button>
)}
            </div>
            <ScrollBar orientation="horizontal"/>
</ScrollArea>
        </div>
          </>
    )
}