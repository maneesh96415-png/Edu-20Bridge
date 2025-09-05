import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="inline-block h-7 w-7 rounded-md bg-gradient-to-br from-primary to-sky-500"></span>
            <span className="text-lg">Edu Bridge</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <NavLink to="/bridgehub" className={({isActive}) => isActive ? "text-foreground" : undefined}>BridgeHub</NavLink>
            <NavLink to="/code-translate" className={({isActive}) => isActive ? "text-foreground" : undefined}>CodeTranslate</NavLink>
            <NavLink to="/explainer-bot" className={({isActive}) => isActive ? "text-foreground" : undefined}>Explainer Bot</NavLink>
            <NavLink to="/career-explorer" className={({isActive}) => isActive ? "text-foreground" : undefined}>Career Explorer</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-sm text-muted-foreground">{user.name} · {user.role}</span>
              <Button variant="secondary" onClick={() => { logout(); navigate("/"); }}>Logout</Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}
