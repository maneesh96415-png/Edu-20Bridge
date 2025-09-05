import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const streams = ["Engineering","Medicine","Commerce","Arts","Vocational","Govt Jobs","Entrepreneurship"];

const exams = {
  JEE: { eligibility: "PCM in 12th", date: "Apr–May", tips: "Mock tests, PYQs, NCERT" },
  NEET: { eligibility: "PCB in 12th", date: "May–June", tips: "NCERT Biology, practice" },
  CLAT: { eligibility: "12th any stream", date: "Dec", tips: "Reading + logic" },
  NDA: { eligibility: "12th, 16.5–19.5 yr", date: "Apr/Sep", tips: "Math + GAT + fitness" },
} as const;

export default function CareerExplorerPage() {
  const [interest, setInterest] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold">Plan Your Career After Class 12</h2>
          <p className="text-muted-foreground mt-2">Explore streams, entrance exams, and future scope. Reach out for personalized guidance.</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {streams.map(s => <div key={s} className="rounded-md border bg-card px-3 py-2 text-sm">{s}</div>)}
          </div>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold">Entrance Exams</h3>
          <Tabs defaultValue="JEE" className="mt-3">
            <TabsList className="grid grid-cols-4">
              {Object.keys(exams).map(k => <TabsTrigger key={k} value={k}>{k}</TabsTrigger>)}
            </TabsList>
            {Object.entries(exams).map(([k, v]) => (
              <TabsContent key={k} value={k} className="mt-3 rounded-md border p-4 text-sm">
                <p><span className="font-medium">Eligibility:</span> {v.eligibility}</p>
                <p><span className="font-medium">Window:</span> {v.date}</p>
                <p><span className="font-medium">Tips:</span> {v.tips}</p>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6 items-start">
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold">Future Scope</h3>
          <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-md border p-3"><div className="text-2xl font-bold">60%</div><p>Jobs</p></div>
            <div className="rounded-md border p-3"><div className="text-2xl font-bold">30%</div><p>Higher Studies</p></div>
            <div className="rounded-md border p-3"><div className="text-2xl font-bold">10%</div><p>Startups</p></div>
          </div>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold">Contact Us</h3>
          <div className="mt-3 grid gap-2">
            <Input placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <Input placeholder="Your interest" value={interest} onChange={(e)=> setInterest(e.target.value)} />
            <Button className="mt-2">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
