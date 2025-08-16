import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/ui/generated-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentFormProps{
    onSuccess?:()=> void;
    onCancel?: ()=> void;
    initialValues?:any;
}

export const AgentForm=({
    onSuccess,
    onCancel,
    initialValues,
}:AgentFormProps)=>{
    const trpc =useTRPC();
    const router  =useRouter();
    const queryClient=useQueryClient();
const CreateAgent=useMutation(
    trpc.agents.create.mutationOptions({
        onSuccess:()=>{
                queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );
               
                onSuccess?.();

        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })
)

const UpdateAgent=useMutation(
    trpc.agents.update.mutationOptions({
        onSuccess:()=>{
                queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );
                 if(initialValues?.id){
                    queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id:initialValues.isEdit })
                    )
                }
             
               onSuccess?.();

        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })
)

const form=useForm<z.infer< typeof agentsInsertSchema>>({
    resolver:zodResolver(agentsInsertSchema),
    defaultValues:{
        name:initialValues?.name??"",
        instruction:initialValues?.instruction??"",
    }
})

const isEdit=!!initialValues?.id;
const isPending= CreateAgent.isPending || UpdateAgent.isPending;
const onSubmit=(values:z.infer<typeof agentsInsertSchema>)=>{
    if(isEdit){
        UpdateAgent.mutate({...values,id:initialValues.id})
    }else{
        CreateAgent.mutate(values)
    }
}
return(
    <Form {...form}>
        <form className="space-y-4 " onSubmit={form.handleSubmit(onSubmit)}>
  <GeneratedAvatar 
  seed={form.watch("name")}
  variant="botttsNeutral"
  className="border size-16"
  />
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
        name="instruction"
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Instruction </FormLabel>
                <FormControl>
                    <Textarea {...field} placeholder="e.g john is helpful" />
                </FormControl>
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
)
}