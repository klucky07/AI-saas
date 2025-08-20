"use client"

import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/ui/data-table";
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingFilters } from "../../hooks/use-meetingfilter";
import { DataPagination } from "@/components/ui/data-pagination";

export const MeetingsView=()=>{
const trpc =useTRPC();
const router=useRouter();
const [filters,setFilters]=useMeetingFilters();
const {data} =useQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
})
)


    return(
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
           <DataTable data={data?.items ?? []} onRowClick={(row)=> router.push(`/meetings/${row.id}`)} columns={columns}/>
           <DataPagination 
           page={filters.page}
           totalPages={data?.totalPages ?? 1}
           onPageChange={(page)=> setFilters({})}
           />
           {data?.items.length === 0  && (
                           <EmptyState
                              title="create your first meeting"
                           description="Create an agent to join your meetings.Each agent will follow your instructions and can interact with participants during the call "/>
                        )}
        </div>
    )
}

