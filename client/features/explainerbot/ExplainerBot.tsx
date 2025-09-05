import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExplainerAPI } from "@/services/api";
import { toast } from "sonner";

export default function ExplainerBotPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [doc, setDoc] = useState<{ id: string; pages: number } | null>(null);
  const [script, setScript] = useState<string>("");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const d = await ExplainerAPI.upload(file);
      setDoc(d);
      setScript(`Intro for slide 1...`);
      toast.success("Analyzing slides…");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold">AI Presentation Explainer</h2>
      {!doc ? (
        <div className="mt-6 grid gap-4">
          <div className="rounded-lg border p-8 text-center">
            <input ref={inputRef} type="file" accept=".pdf,.ppt,.pptx" className="hidden" onChange={(e)=> setFile(e.target.files?.[0] ?? null)} />
            <p className="text-muted-foreground">Upload PPT/PDF</p>
            <div className="mt-3 flex justify-center gap-2">
              <Button onClick={()=> inputRef.current?.click()}>Choose File</Button>
              <Button onClick={onUpload} disabled={!file || uploading}>{uploading?"Uploading…":"Analyze"}</Button>
            </div>
            {file && <p className="mt-2 text-sm">{file.name}</p>}
          </div>
        </div>
      ) : (
        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Slides</h3>
              <div className="flex gap-2">
                <select className="h-9 rounded-md border bg-background px-2" value={page} onChange={(e)=> setPage(parseInt(e.target.value))}>
                  {Array.from({ length: doc.pages }).map((_, i) => (
                    <option key={i} value={i+1}>Slide {i+1}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3 aspect-video rounded-md border bg-muted flex items-center justify-center text-muted-foreground">
              <span>Preview slide {page}</span>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Script</h3>
            <textarea className="mt-3 h-64 w-full rounded-md border bg-background p-3" value={script} onChange={(e)=> setScript(e.target.value)} />
            <div className="mt-3 flex gap-2">
              <Button onClick={async()=> { await ExplainerAPI.narrate(doc.id, script); toast.success("Playing narration"); }}>Play Narration</Button>
              <Button variant="secondary">Change Voice</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
