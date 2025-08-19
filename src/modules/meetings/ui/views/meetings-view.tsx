"use client"

import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/ui/data-table";
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView=()=>{
const trpc =useTRPC();
const {data} =useQuery(trpc.meetings.getMany.queryOptions({})
)
    return(
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
           <DataTable data={data?.items ?? []} columns={columns}/>
           {data?.items.length === 0  && (
                           <EmptyState
                           title="create your first meeting"
                           description="Create an agent to join your meetings.Each agent will follow your instructions and can interact with participants during the call "/>
                        )}
        </div>
    )
}

