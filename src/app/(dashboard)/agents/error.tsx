"use client"

import { ErrorState } from "@/components/ui/error-state";

const Errorpage=()=>{
    return(
        <ErrorState title="erro loading agents" 
        description="something went wrong" />
    )
}

export default Errorpage;