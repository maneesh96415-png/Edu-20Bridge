import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Services, Mentor } from "@/services/api";
import { toast } from "sonner";

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [q, setQ] = useState("");
  const [skill, setSkill] = useState("");

  useEffect(() => {
    Services.listMentors().then(setMentors);
  }, []);

  const skills = useMemo(() => Array.from(new Set(mentors.flatMap(m => m.expertise))), [mentors]);
  const filtered = useMemo(() => mentors.filter(m => (
    (!q || m.name.toLowerCase().includes(q.toLowerCase()) || m.bio.toLowerCase().includes(q.toLowerCase())) &&
    (!skill || m.expertise.includes(skill))
  )), [mentors, q, skill]);

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold">Find Mentors</h2>
      <div className="mt-4 grid sm:grid-cols-3 gap-3">
        <Input placeholder="Search by name or bio" value={q} onChange={(e)=>setQ(e.target.value)} />
        <select className="h-10 rounded-md border bg-background px-3" value={skill} onChange={(e)=>setSkill(e.target.value)}>
          <option value="">All skills</option>
          {skills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <Button variant="secondary" onClick={()=>{setQ(""); setSkill("");}}>Reset</Button>
      </div>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(m => (
          <div key={m.id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.bio}</p>
              </div>
              <span className="text-sm">⭐ {m.rating.toFixed(1)}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {m.expertise.map(s => <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-xs">{s}</span>)}
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" onClick={()=> toast.success(`Requested session with ${m.name}`)}>Book Session</Button>
              <Button variant="secondary" className="flex-1" onClick={()=> toast.info(`Messaged ${m.name}`)}>Message</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
