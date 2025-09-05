import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth, Role } from "@/store/auth";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { login } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("student");
  const navigate = useNavigate();

  const submit = () => {
    if (!email || (mode==="signup" && !name)) return;
    login({ name: name || email.split("@")[0], email, role });
    navigate("/");
  };

  return (
    <div className="container py-12 max-w-md">
      <div className="rounded-xl border p-6">
        <div className="flex gap-2 rounded-md border p-1 text-sm">
          <button className={`flex-1 rounded px-3 py-1 ${mode==="signin"?"bg-primary text-primary-foreground":""}`} onClick={()=> setMode("signin")}>Sign In</button>
          <button className={`flex-1 rounded px-3 py-1 ${mode==="signup"?"bg-primary text-primary-foreground":""}`} onClick={()=> setMode("signup")}>Sign Up</button>
        </div>
        <div className="mt-4 grid gap-3">
          {mode === "signup" && (
            <Input placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} />
          )}
          <Input placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <select className="h-10 rounded-md border bg-background px-3" value={role} onChange={(e)=> setRole(e.target.value as Role)}>
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>
          <Button onClick={submit}>{mode==="signin"?"Sign In":"Create Account"}</Button>
        </div>
      </div>
    </div>
  );
}
