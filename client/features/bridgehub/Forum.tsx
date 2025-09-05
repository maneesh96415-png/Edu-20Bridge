import { useEffect, useState } from "react";
import { Services, ForumPost } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => { Services.listForum().then(setPosts); }, []);

  const add = () => {
    if (!title.trim()) return;
    setPosts((p) => [{ id: crypto.randomUUID(), title, body, votes: 0, accepted: false }, ...p]);
    setTitle(""); setBody("");
  };

  const vote = (id: string, delta: number) => setPosts((p)=> p.map(x => x.id===id? { ...x, votes: x.votes + delta }: x));
  const accept = (id: string) => setPosts((p)=> p.map(x => ({ ...x, accepted: x.id===id })));

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold">Q&A Forum</h2>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Input placeholder="Question title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <Input placeholder="Details" value={body} onChange={(e)=>setBody(e.target.value)} />
      </div>
      <div className="mt-2"><Button onClick={add}>Post Question</Button></div>

      <div className="mt-6 grid gap-4">
        {posts.map(p => (
          <div key={p.id} className={`rounded-lg border p-4 ${p.accepted?"ring-2 ring-emerald-500":""}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={()=> vote(p.id, 1)}>▲</Button>
                <span className="w-8 text-center">{p.votes}</span>
                <Button variant="secondary" onClick={()=> vote(p.id, -1)}>▼</Button>
              </div>
            </div>
            <div className="mt-3">
              <Button variant="ghost" onClick={()=> accept(p.id)}>{p.accepted?"Accepted":"Mark as accepted"}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
