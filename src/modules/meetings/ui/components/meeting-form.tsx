import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import {  meetingsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/ui/generated-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { CommandSelect } from "@/components/ui/command-select";
import { Divide } from "lucide-react";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialogue";

interface AgentMeetingProps{
    onSuccess?:(id?:string)=> void;
    onCancel?: ()=> void;
    initialValues?:any;
}

export const MeetingForm=({
    onSuccess,
    onCancel,
    initialValues,
}:AgentMeetingProps)=>{
    const trpc =useTRPC();
    const router  =useRouter();
    const queryClient=useQueryClient();
    const[openAgent,setOpenAgent]=useState(false)
  const[agentSearch ,setAgentSearch]=useState("")
    const agents=useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize:100,
            search:agentSearch,
        })
    )


const CreateMeeting=useMutation(
    trpc.meetings.create.mutationOptions({
        onSuccess:async(data)=>{
               await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
               
                onSuccess?.(data.id);

        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })
)

const UpdateMeeting=useMutation(
    trpc.meetings.update.mutationOptions({
        onSuccess:()=>{
                queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
                 if(initialValues?.id){
                    queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({id:initialValues.id })
                    )
                }
             
               onSuccess?.();

        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })
)

const form=useForm<z.infer< typeof meetingsInsertSchema>>({
    resolver:zodResolver(meetingsInsertSchema),
    defaultValues:{
        name:initialValues?.name??"",
        agentId:initialValues?.agentId??"",
    }
})

const isEdit=!!initialValues?.id;
const isPending= CreateMeeting.isPending || UpdateMeeting.isPending;
const onSubmit=(values:z.infer<typeof meetingsInsertSchema>)=>{
    
    if(isEdit){
        UpdateMeeting.mutate({...values,id:initialValues.id})
    }else{
        CreateMeeting.mutate(values);
    }
}
return(
    <>
    <NewAgentDialog open={openAgent} onOpenChange={setOpenAgent}/>
  
    <Form {...form}>
        <form className="space-y-4 " onSubmit={form.handleSubmit(onSubmit)}>

        <FormField
        name="name"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} placeholder="e.g john john" />
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        
        />
         <FormField
        name="agentId"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                   <CommandSelect
                   options={(agents.data?.items ?? []).map((agent)=>({
                    id:agent.id,
                    value:agent.id,
                    children:(
                        <div className="flex items-center gap-x-2">
                            <GeneratedAvatar 
                            seed={agent.id}
                            variant="botttsNeutral"
                            className="border size-6"
                            />
                            <span>{agent.name}</span>
                        </div>
                    )
                   }))}
                   onSelect={field.onChange}
                   onSearch={setAgentSearch}
                   value={field.value}
                   placeholder="select an agent"
                   />
                </FormControl>
                <FormDescription>
                    Not Found what you are lookig for ?{ ' '}
                    <button type="button"
                    className="text-primary hover:underline "
                    onClick={()=>setOpenAgent(true)}>
 Create new agent
                    </button>
                </FormDescription>
                <FormMessage/>
            </FormItem>
        )}
        
        />
       
<div className="flex justify-between gap-x-2">
    {onCancel && (
        <Button 
        variant="ghost"
        disabled={isPending}
        type="button"
        onClick={()=> onCancel()}>
            cancel
        </Button>
    )}

    <Button  
    disabled={isPending} type="submit">
        {isEdit ?"Update" :"Create"}

    </Button>
</div>
        </form>

    </Form>
      </>
)
}