import { addDays, eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SessionsPage() {
  const [current, setCurrent] = useState(new Date());
  const start = startOfMonth(current);
  const end = endOfMonth(current);
  const days = useMemo(() => eachDayOfInterval({ start, end }), [current]);
  const [selected, setSelected] = useState<Date | null>(null);

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Schedule Session</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={()=> setCurrent(addDays(current, -30))}>Prev</Button>
          <Button variant="secondary" onClick={()=> setCurrent(addDays(current, 30))}>Next</Button>
        </div>
      </div>
      <p className="text-muted-foreground mt-1">{format(current, "MMMM yyyy")}</p>
      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-sm text-muted-foreground">
        {weekdays.map((d) => (<div key={d} className="py-1">{d}</div>))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => (
          <button key={d.toISOString()} onClick={()=> setSelected(d)} className={`aspect-square rounded-md border p-2 text-left hover:shadow-sm ${selected?.toDateString()===d.toDateString()?"ring-2 ring-primary":""}`}>
            <div className="text-sm">{format(d, "d")}</div>
            <div className="mt-1 h-1 w-6 rounded bg-emerald-500/60"/>
          </button>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Button disabled={!selected} onClick={()=> selected && toast.success(`Booked session on ${format(selected, "PPP")}`)}>Book</Button>
        <Button variant="secondary" disabled={!selected} onClick={()=> setSelected(null)}>Clear</Button>
      </div>
    </div>
  );
}

const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
