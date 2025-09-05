import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { CodeTranslateAPI } from "@/services/api";
import { toast } from "sonner";

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "c",
  "cpp",
  "go",
  "rust",
];

type Tab = "translate" | "explain";

function basicSyntaxCheck(lang: string, code: string): string | null {
  // Very small heuristics to catch obvious syntax mistakes for non-executable languages
  if (lang === "python") {
    // unmatched parentheses
    const open = (code.match(/\(/g) || []).length;
    const close = (code.match(/\)/g) || []).length;
    if (open !== close) return "Unmatched parentheses detected.";
  }
  if (lang === "java") {
    if (!/class\s+\w+/.test(code))
      return "No class definition found (Java requires a class).";
  }
  if (lang === "c" || lang === "cpp") {
    if (!/int\s+main\s*\(/.test(code))
      return "No main function found (expected 'int main(...)').";
  }
  return null;
}

export default function CodeTranslatePage() {
  const [from, setFrom] = useState("python");
  const [to, setTo] = useState("java");
  const [tab, setTab] = useState<Tab>("translate");
  const [input, setInput] = useState('print("Hello")');
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leftRunOutput, setLeftRunOutput] = useState<string>("");
  const [rightRunOutput, setRightRunOutput] = useState<string>("");
  const leftEditorRef = useRef<any>(null);
  const rightEditorRef = useRef<any>(null);

  const runTranslation = async () => {
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

  const runCodeInBrowser = async (
    lang: string,
    code: string,
    setOut: (v: string) => void,
  ) => {
    setOut("");
    // JS/TS execution available in browser (TS transpiled roughly by Monaco but we'll run as JS)
    if (lang === "javascript" || lang === "typescript") {
      try {
        const logs: string[] = [];
        const origLog = console.log;
        console.log = (...args: any[]) => {
          logs.push(args.map((a) => String(a)).join(" "));
          origLog(...args);
        };
        try {
          // eslint-disable-next-line no-new-func
          const fn = new Function(code);
          const result = fn();
          if (result !== undefined) logs.push(String(result));
        } finally {
          console.log = origLog;
        }
        setOut(logs.length ? logs.join("\n") : "(no output)");
      } catch (err: any) {
        setOut(`Runtime error: ${err?.message ?? String(err)}`);
      }
      return;
    }

    // For other languages perform a lightweight syntax check only
    const err = basicSyntaxCheck(lang, code);
    if (err) {
      setOut(`Syntax check failed: ${err}`);
    } else {
      setOut(
        "Run not available for this language in-browser; syntax looks OK.",
      );
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (e) {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="container py-6">
      <div className="rounded-xl border p-4 mb-6 grid gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3836f58560d244d4a3b3249f2c315c31%2F7b696e140b7644efbfb186147da823e2?format=webp&width=800"
              alt="CodeTranslate"
              className="h-12 w-12 rounded-md object-cover shadow-sm"
            />
            <div>
              <h3 className="text-lg font-semibold">CodeTranslate AI</h3>
              <p className="text-sm text-muted-foreground">
                Translate and explain code across multiple languages with
                side‑by‑side editors.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={runTranslation} disabled={loading}>
              {loading
                ? "Working…"
                : tab === "translate"
                  ? "Translate Code"
                  : "Explain Input Code"}
            </Button>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <select
            className="h-10 rounded-md border bg-background px-3"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <span className="text-sm text-muted-foreground">→</span>
          <select
            className="h-10 rounded-md border bg-background px-3"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={tab !== "translate"}
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <div className="ml-auto flex gap-2 rounded-md border p-1">
            <button
              onClick={() => setTab("translate")}
              className={`px-3 py-1 rounded ${tab === "translate" ? "bg-primary text-primary-foreground" : ""}`}
            >
              Translation
            </button>
            <button
              onClick={() => setTab("explain")}
              className={`px-3 py-1 rounded ${tab === "explain" ? "bg-primary text-primary-foreground" : ""}`}
            >
              Explanation
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-lg border overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <div className="font-medium">Input Code</div>
              <div className="ml-2 text-sm text-muted-foreground">{from}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => runCodeInBrowser(from, input, setLeftRunOutput)}
              >
                Run
              </Button>
              <Button variant="ghost" onClick={() => copyToClipboard(input)}>
                Copy
              </Button>
            </div>
          </div>
          <Editor
            height="48vh"
            language={from}
            theme="vs-dark"
            value={input}
            onChange={(v) => setInput(v ?? "")}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
            onMount={(editor) => {
              leftEditorRef.current = editor;
            }}
          />
          <div className="p-3 border-t bg-card">
            <div className="text-sm font-medium">Output:</div>
            <pre className="mt-2 rounded-md bg-black/90 text-xs text-emerald-300 p-3">
              {leftRunOutput || "(no output)"}
            </pre>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <div className="font-medium">
                {tab === "translate" ? "Translated Code" : "Explanation"}
              </div>
              <div className="ml-2 text-sm text-muted-foreground">
                {tab === "translate" ? to : from}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() =>
                  runCodeInBrowser(
                    tab === "translate" ? to : from,
                    output,
                    setRightRunOutput,
                  )
                }
              >
                {tab === "translate" ? "Run" : "Analyze"}
              </Button>
              <Button variant="ghost" onClick={() => copyToClipboard(output)}>
                Copy
              </Button>
            </div>
          </div>

          <Editor
            height="48vh"
            language={tab === "translate" ? to : from}
            theme="vs-dark"
            value={output}
            onChange={(v) => setOutput(v ?? "")}
            options={{
              readOnly: false,
              minimap: { enabled: false },
              fontSize: 14,
            }}
            onMount={(editor) => {
              rightEditorRef.current = editor;
            }}
          />

          <div className="p-3 border-t bg-card">
            <div className="text-sm font-medium">Output:</div>
            <pre className="mt-2 rounded-md bg-black/90 text-xs text-emerald-300 p-3">
              {rightRunOutput || "(no output)"}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-lg border p-4">
          <h4 className="font-semibold">Code Overview</h4>
          <p className="text-sm text-muted-foreground mt-2">
            Fast overview and line-by-line breakdown will appear here when using
            the Explain tab.
          </p>
        </div>
        {tab === "explain" && (
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold">Line-by-Line Breakdown</h4>
            <pre className="mt-2 text-sm text-muted-foreground">
              {output || "(will show explanation when available)"}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
