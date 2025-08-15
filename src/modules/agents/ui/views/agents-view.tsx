"use client"
import { Button } from "@/components/ui/button"
import { LoadingState } from "@/components/loading-state"
import { ResponsiveDialog } from "@/components/responsive-dialog"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { DataTable } from "../components/data-table"
import { columns  } from "../components/columns"
import { EmptyState } from "@/components/empty-state"
import { useAgenstFilter } from "../../hooks/use-agentsfilters"
import { DataPagination } from "../components/data-pagination"


export const AgentsView = () => {
    const [filters ,setFilters] = useAgenstFilter()
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    return (
        <div  className="flec-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
           
             <DataTable data={data.items } columns={columns}/>
             <DataPagination page={filters.page}
             totalPages={data.totalPages}
             onPageChange={(page)=> setFilters({page})} />
             {data.items.length === 0  && (
                <EmptyState 
                title="create your first agent"
                description="Create an agent to join your meetings.Each agent will follow your instructions and can interact with participants during the call "/>
             )}
            </div>
    )
}


export const AgentsViewLoading = () => {
    return (
        <LoadingState title="Loading agents "
            description="this may take a few moments" />
    )
}