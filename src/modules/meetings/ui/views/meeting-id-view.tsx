"use client"

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "./meeting-id-view-header";
import { useRouter } from "next/navigation";
import { UseConfirm } from "../../hooks/use-confirm";


interface Props {
    meetingId:string
}

export const MeetingIdView =({meetingId}:Props)=>{
    const trpc =useTRPC();
    const router =useRouter();
    const queryClient=useQueryClient();
    const[RemoveConfirmation,confirmRemove]=UseConfirm(
        "are you sure?",
        "The following will remove the meeting"
    )
    const {data} =useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({id:meetingId})
    )
const removeMeeting =useMutation(
    trpc.meetings.remove.mutationOptions({
        onSuccess:()=>{
            queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
        router.push('/meetings')
        },
       
    })
)

const handleRemoveMeeting =async ()=>{
    const ok =await confirmRemove();
    if(!ok) return;
    await removeMeeting.mutateAsync({id:meetingId})
}
    return (
        <>
        <RemoveConfirmation/>
        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
<MeetingIdViewHeader
meetingId={meetingId}
meetingName={data.name}
onEdit={()=>{}}
onRemove={()=>{handleRemoveMeeting}}

/>
        </div>
        </>
    )

}

export const MeetingIdLoading = () => {
    return (
        <LoadingState title="Loading agents "
            description="this may take a few moments" />
    )
}