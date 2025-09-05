import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { CodeTranslateAPI } from "@/services/api";
import { toast } from "sonner";

const languages = ["javascript","typescript","python","java","c","cpp","go","rust"];

type Tab = "translate" | "explain";

export default function CodeTranslatePage() {
  const [from, setFrom] = useState("javascript");
  const [to, setTo] = useState("python");
  const [tab, setTab] = useState<Tab>("translate");
  const [input, setInput] = useState("function add(a,b){\n  return a+b;\n}");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    try {
      setLoading(true);
      if (tab === "translate") {
        const res = await CodeTranslateAPI.translate(input, from, to);
        setOutput(res);
      } else {
        const res = await CodeTranslateAPI.explain(input, from);
        setOutput(res);
      }
      toast.success("Done");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-center gap-3">
        <select className="h-10 rounded-md border bg-background px-3" value={from} onChange={(e)=>setFrom(e.target.value)}>
          {languages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <span className="text-sm text-muted-foreground">→</span>
        <select className="h-10 rounded-md border bg-background px-3" value={to} onChange={(e)=>setTo(e.target.value)} disabled={tab!=="translate"}>
          {languages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <div className="ml-auto flex gap-2 rounded-md border p-1">
          <button onClick={()=> setTab("translate")} className={`px-3 py-1 rounded ${tab==="translate"?"bg-primary text-primary-foreground":""}`}>Translation</button>
          <button onClick={()=> setTab("explain")} className={`px-3 py-1 rounded ${tab==="explain"?"bg-primary text-primary-foreground":""}`}>Explanation</button>
        </div>
        <Button onClick={run} disabled={loading}>{loading?"Working…": tab==="translate"?"Translate":"Explain Code"}</Button>
      </div>
      <div className="mt-4 grid lg:grid-cols-2 gap-4">
        <div className="rounded-lg border overflow-hidden">
          <Editor height="60vh" language={from} theme="vs-dark" value={input} onChange={(v)=> setInput(v ?? "")} options={{ minimap: {enabled:false}, fontSize:14 }} />
        </div>
        <div className="rounded-lg border overflow-hidden">
          <Editor height="60vh" language={tab==="translate"?to:from} theme="vs-dark" value={output} onChange={(v)=> setOutput(v ?? "")} options={{ readOnly:false, minimap: {enabled:false}, fontSize:14 }} />
        </div>
      </div>
    </div>
  );
}
