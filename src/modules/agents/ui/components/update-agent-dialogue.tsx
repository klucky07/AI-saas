import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/trpc/server";
import { toast } from "sonner";

interface updateAgentDialogProps{
    open:boolean;
    onOpenChange:(open: boolean)=> void;
   
    initialValues :AgentGetOne

}

export const UpdateAgentDialog=({
    open,
    onOpenChange,
    initialValues
}:updateAgentDialogProps)=>{
    const queryClient=useQueryClient()




    return (
        <ResponsiveDialog
        title="edit agent"
        description="edit the  agent details"
        open={open}
        onOpenChange={onOpenChange}
        >
<AgentForm onSuccess={()=> onOpenChange(false)}
    onCancel={()=> onOpenChange(false)}
    initialValues={initialValues}/>
        </ResponsiveDialog>
    )

}

function onSuccess() {
    throw new Error("Function not implemented.");
}
