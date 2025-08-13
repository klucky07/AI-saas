"use client"

import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/ui/error-state"
import { useTRPC } from "@/trpc/client"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"


export const AgentsView =()=>{
    const trpc =useTRPC()
    const {data}=useSuspenseQuery(trpc.agents.getMany.queryOptions());
   
    return(

        <div>{JSON.stringify(data,null,2)}</div>
    )
}


export const AgentsViewLoading=()=>{
    return(
        <LoadingState title="Loading agents "
        description="this may take a few moments"/>
    )
}