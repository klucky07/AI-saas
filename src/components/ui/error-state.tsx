import { AlertCircleIcon } from "lucide-react";

interface Props{
    title:string,
    description:string;
}

export const ErrorState=(
    {
        title,
        description
    }:Props
)=>{
return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-2 bg-background rounded-lg">
            <AlertCircleIcon className="size-6 animate-spin text-primary"/>
            <div className="flex flex-col gap-y-2 text-center">
                <h2 className="text-lg font-medium">{title}</h2>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    </div>
)
}