"use client"

import { ErrorState } from "@/components/ui/error-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../component/call-provider";


interface Props{
    meetingId:string;
}

export const CallView=({
    meetingId
}:Props)=>{
    const trpc =useTRPC();
    const{data} =useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meetingId}))
    if(data.status === "completed"){
        return(
            <div className="flex h-screen items-center justify-center">
                <ErrorState title="MEeting has ended"
                description="You can no longer join to this meeting"
                />
            </div>
        )
    }
    
    return <CallProvider
    meetingId={meetingId} meetingName={data.name}
    />
}