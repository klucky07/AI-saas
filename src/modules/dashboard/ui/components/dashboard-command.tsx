
import { CommandDialog ,CommandInput, CommandItem, CommandList, CommandResponsiveDialog} from "@/components/ui/command";

import { Dispatch, SetStateAction } from "react";

interface Props{
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>
}
export const Dashboardcommand=( {open,setOpen}:Props)=>{
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput
            placeholder="Find a meeting"/>
            <CommandList>
                <CommandItem>
                    test
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
    )
}