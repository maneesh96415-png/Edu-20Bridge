import { RequestHandler } from "express";

function mockTranslate(code: string, from: string, to: string): string {
  let output = code;

  // Simple translator rules
  if (from === "python") {
    // Translate print
    output = output.replace(/print\((.*)\)/g, (match, p1) => {
      if (to === "javascript" || to === "typescript") {
        return `console.log(${p1});`;
      } else if (to === "java") {
        return `System.out.println(${p1});`;
      } else if (to === "c" || to === "cpp") {
        return `printf(${p1});`;
      } else if (to === "go") {
        return `fmt.Println(${p1})`;
      } else if (to === "rust") {
        return `println!(${p1});`;
      }
      return match;
    });
    // Replace comment symbol
    if (to !== "python") {
      output = output.replace(/#(.*)/g, "// $1");
    }
  } else if (from === "javascript" || from === "typescript") {
    output = output.replace(/console\.log\((.*)\);?/g, (match, p1) => {
      if (to === "python") {
        return `print(${p1})`;
      } else if (to === "java") {
        return `System.out.println(${p1});`;
      } else if (to === "c" || to === "cpp") {
        return `printf(${p1});`;
      } else if (to === "go") {
        return `fmt.Println(${p1})`;
      } else if (to === "rust") {
        return `println!(${p1});`;
      }
      return match;
    });
    // Replace comment symbol if target is python
    if (to === "python") {
      output = output.replace(/\/\/(.*)/g, "#$1");
    }
  }

  // Wrap Java if needed
  if (to === "java" && !output.includes("class")) {
    output = `public class Main {\n    public static void main(String[] args) {\n        ${output.split("\n").join("\n        ")}\n    }\n}`;
  }

  // Wrap C/C++ if needed
  if ((to === "c" || to === "cpp") && !output.includes("main")) {
    output = `#include <stdio.h>\n\nint main() {\n    ${output.split("\n").join("\n    ")}\n    return 0;\n}`;
  }

  return `// Translated (${from} → ${to})\n` + output;
}

function mockExplain(code: string, lang: string): string {
  const lines = code.split("\n");
  const explanation = lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return `Line ${idx + 1}: Empty line.`;

    if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
      return `Line ${idx + 1}: A comment: "${trimmed.replace(/^[#\/]+/, "").trim()}"`;
    }
    if (trimmed.includes("print(") || trimmed.includes("console.log(") || trimmed.includes("System.out.println(")) {
      return `Line ${idx + 1}: Outputs data/message to the console.`;
    }
    if (trimmed.startsWith("def ") || trimmed.startsWith("function ") || trimmed.includes("void ")) {
      return `Line ${idx + 1}: Declares a new function/method.`;
    }
    if (trimmed.includes("if ") || trimmed.startsWith("if(")) {
      return `Line ${idx + 1}: A conditional check.`;
    }
    if (trimmed.includes("for ") || trimmed.includes("while ")) {
      return `Line ${idx + 1}: Instantiates a loop.`;
    }
    if (trimmed.includes("const ") || trimmed.includes("let ") || trimmed.includes("var ") || trimmed.includes("=")) {
      return `Line ${idx + 1}: Variables declaration/assignment.`;
    }
    return `Line ${idx + 1}: Executes code statement.`;
  });

  return `Code Explanation (${lang}):\n\n` + explanation.join("\n");
}

function runUniversalCode(code: string, lang: string): { logs: string[]; state: any } {
  const logs: string[] = [];
  const lines = code.split("\n");
  const state: any = {};

  const evalExpr = (expr: string): any => {
    let cleaned = expr.trim();
    if (cleaned.endsWith(";")) cleaned = cleaned.slice(0, -1);

    // Check for string literal
    if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
      return cleaned.slice(1, -1);
    }

    // Check for number
    if (!isNaN(cleaned as any) && cleaned !== "") {
      return Number(cleaned);
    }

    // Check in state
    if (state[cleaned] !== undefined) {
      return state[cleaned];
    }

    // Try basic evaluation
    try {
      const keys = Object.keys(state);
      const vals = Object.values(state);
      // eslint-disable-next-line no-new-func
      const fn = new Function(...keys, `return ${cleaned};`);
      return fn(...vals);
    } catch {
      return cleaned;
    }
  };

  try {
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();

      if (!line || line.startsWith("#") || line.startsWith("//") || line.startsWith("/*") || line.startsWith("*")) {
        i++;
        continue;
      }

      // Variable Assignment (let x = 5, int x = 5, x = 5)
      const assignMatch = line.match(/^(?:(?:let|const|var|int|float|double|String|auto)\s+)?([a-zA-Z_]\w*)\s*(?:=|\s*:=\s*)\s*(.+)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        let valExpr = assignMatch[2];
        if (valExpr.endsWith(";")) valExpr = valExpr.slice(0, -1);
        state[varName] = evalExpr(valExpr);
        i++;
        continue;
      }

      // Print statements
      if (line.startsWith("std::cout")) {
        const parts = line.split("<<").slice(1);
        let output = "";
        for (let part of parts) {
          part = part.trim();
          if (part === "std::endl" || part === "endl" || part.endsWith(";")) continue;
          output += String(evalExpr(part));
        }
        logs.push(output);
        i++;
        continue;
      }

      const printMatch = line.match(/(?:print|console\.log|System\.out\.println|printf|fmt\.Println|println!)\s*\((.*)\)/);
      if (printMatch) {
        let argsStr = printMatch[1].trim();
        if (argsStr.startsWith('"') && argsStr.includes('%') && argsStr.includes(',')) {
          const commaIdx = argsStr.indexOf(',');
          let formatStr = argsStr.slice(1, commaIdx - 1);
          const formatArgs = argsStr.slice(commaIdx + 1).split(',').map(a => evalExpr(a.trim()));
          let argIdx = 0;
          const formatted = formatStr.replace(/%[difs]/g, () => {
            return String(formatArgs[argIdx++] ?? "");
          });
          logs.push(formatted);
        } else {
          // split by comma (ignoring commas inside quotes)
          const args = argsStr.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(a => evalExpr(a.trim()));
          logs.push(args.map(String).join(" "));
        }
        i++;
        continue;
      }

      // Loop constructs
      const pyLoopMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+range\(\s*(\d+)\s*\)\s*:/);
      const jsLoopMatch = line.match(/^for\s*\(\s*(?:let|int)?\s*([a-zA-Z_]\w*)\s*=\s*0\s*;\s*\1\s*<\s*(\d+)\s*;\s*\1\+\+\s*\)/);
      const goLoopMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s*:=\s*0\s*;\s*\1\s*<\s*(\d+)\s*;\s*\1\+\+/);

      const matchedLoop = pyLoopMatch || jsLoopMatch || goLoopMatch;
      if (matchedLoop) {
        const loopVar = matchedLoop[1];
        const rangeLimit = parseInt(matchedLoop[2]);

        const bodyLines: string[] = [];
        let j = i + 1;
        let bracesCount = line.includes("{") ? 1 : 0;

        while (j < lines.length) {
          const bodyLine = lines[j];
          const trimmedBody = bodyLine.trim();

          if (bracesCount > 0) {
            if (trimmedBody.includes("{")) bracesCount++;
            if (trimmedBody.includes("}")) bracesCount--;
            if (bracesCount === 0) {
              j++;
              break;
            }
            bodyLines.push(trimmedBody);
          } else {
            const originalIndent = (lines[i].match(/^\s*/) || [""])[0].length;
            const currentIndent = (bodyLine.match(/^\s*/) || [""])[0].length;
            if (trimmedBody && currentIndent <= originalIndent) {
              break;
            }
            bodyLines.push(trimmedBody);
          }
          j++;
        }

        for (let loopVal = 0; loopVal < Math.min(rangeLimit, 100); loopVal++) {
          state[loopVar] = loopVal;
          const subRun = runUniversalCode(bodyLines.join("\n"), lang);
          if (subRun.logs.length > 0) {
            logs.push(...subRun.logs);
          }
        }

        i = j;
        continue;
      }

      i++;
    }
  } catch (err: any) {
    logs.push(`Error executing: ${err.message}`);
  }

  return { logs, state };
}

export const handleTranslate: RequestHandler = (req, res) => {
  const { code, from, to } = req.body;
  if (!code) {
    res.status(400).json({ error: "Missing code parameter" });
    return;
  }
  const translated = mockTranslate(code, from || "python", to || "java");
  res.status(200).json({ translated });
};

export const handleExplain: RequestHandler = (req, res) => {
  const { code, lang } = req.body;
  if (!code) {
    res.status(400).json({ error: "Missing code parameter" });
    return;
  }
  const explanation = mockExplain(code, lang || "python");
  res.status(200).json({ explanation });
};

export const handleRunCode: RequestHandler = (req, res) => {
  const { code, lang } = req.body;
  if (!code) {
    res.status(400).json({ error: "Missing code parameter" });
    return;
  }
  const { logs } = runUniversalCode(code, lang || "python");
  res.status(200).json({ output: logs.join("\n") });
};
