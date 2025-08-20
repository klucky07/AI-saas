import { Children } from "react"
import { MeetingStatus } from "../../types"
import { CircleXIcon, ClockArrowUpIcon, LoaderCircleIcon, VideoIcon } from "lucide-react"
import { useMeetingFilters } from "../../hooks/use-meetingfilter"
import { CommandSelect } from "@/components/ui/command-select"
import { Value } from "@radix-ui/react-select"

 

 const options= [
    {
        id:MeetingStatus.Upcoming,
        value: MeetingStatus.Upcoming,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
<ClockArrowUpIcon/>
{MeetingStatus.Upcoming}

            </div>
        )
    },
     {
        id:MeetingStatus.Completed,
        value: MeetingStatus.Completed,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
<ClockArrowUpIcon/>
{MeetingStatus.Completed}

            </div>
        )
    },
     {
        id:MeetingStatus.Active,
        value: MeetingStatus.Active,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
<VideoIcon/>
{MeetingStatus.Active}

            </div>
        )
    },
     {
        id:MeetingStatus.Cancelled,
        value: MeetingStatus.Cancelled,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
<CircleXIcon/>
{MeetingStatus.Cancelled}

            </div>
        )
    },
     {
        id:MeetingStatus.Processing,
        value: MeetingStatus.Upcoming,
        children:(
            <div className="flex items-center gap-x-2 capitalize">
<LoaderCircleIcon/>
{MeetingStatus.Upcoming}

            </div>
        )
    }
 ]
export const StatusFilter =() =>{

const [filters,setFilters]= useMeetingFilters();

return(
    <CommandSelect
   
    placeholder="status"
    className="h-9"
    options={options}
onSelect={(value)=> setFilters({status:value as MeetingStatus})}    
   value={filters.status ?? ""}

/>
)
}