"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { useState } from "react"
import { NewAgentDialog } from "./new-agent-dialogue"
import { useAgenstFilter } from "../../hooks/use-agentsfilters"
import { AgentsSearchFilter } from "./agents-search-filter"
import { DEFAULT_PAGE } from "@/constants"
export const AgentsListHeader=()=>{
    const[filters,setFilters]=useAgenstFilter();
const[isDialogueopen,setIsDialogueopen]=useState(false);
const isAnyFilterModified =!! filters.search;

const onClearFilters = () => {
    setFilters({
        search: "",
        page: DEFAULT_PAGE as number,
    });
}

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
            <div className="flex items-center gap-x-2 px-2">
                <AgentsSearchFilter/>
{isAnyFilterModified && (
    <Button variant="outline" size="sm" onClick={onClearFilters}>
        <XCircleIcon/>clear
    </Button>
)}
            </div>

        </div>
          </>
    )
}