import { ReactNode, useState } from "react";
import { Button } from "./button";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "./command";
import { CommandEmpty } from "cmdk";


interface Props{
    options:Array<{
        id:string;
        value:string;
        children:ReactNode;
    }>
    onSelect:(value:string)=>void;
    onSearch:(value:string)=>void;
    value:string;
    placeholder?:string;
    isSearchable?:boolean;
    className?:string;
}

export const CommandSelect =({
options,onSearch,onSelect,value,placeholder,isSearchable,className

}:Props)=>{
    const [open,setOpen]=useState(false);
    const selectedOption=options.find((option)=>option.value === value);

    return(
        <>
        <Button
        onClick={()=>setOpen(true)}
         type="button"
        variant="outline"
        className={cn(
            "h-9 justify-between font-normal px-2",
            !selectedOption && "text-muted-foreground",
            
            className,
        )}
        >
            <div>
                {selectedOption?.children??placeholder}
            </div>
            <ChevronsUpDownIcon/>
        </Button>
        <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={setOpen}>
                <CommandInput placeholder="search... " onValueChange={onSearch} />
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No option found
                        </span>
                    </CommandEmpty>
                    {options.map((option)=>(
                        <CommandItem 
                        key={option.id}
                        onSelect={()=>{
                            onSelect(option.value)
                            setOpen(false)
                        }}
                        >
                            {option.children}
                        </CommandItem>
                    ))}
                </CommandList>
        </CommandResponsiveDialog>
        </>
    )

}