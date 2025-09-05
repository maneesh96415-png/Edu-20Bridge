import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BridgeHubLanding() {
  return (
    <div className="container py-12">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">BridgeHub – Mentorship & Career Growth</h2>
          <p className="mt-3 text-muted-foreground max-w-prose">Find mentors, book sessions, ask questions in forum, and track progress with badges and leaderboard.</p>
          <div className="mt-6 flex gap-3">
            <Button asChild><Link to="/bridgehub/mentors">Find Mentors</Link></Button>
            <Button variant="secondary" asChild><Link to="/bridgehub/sessions">Schedule Session</Link></Button>
          </div>
        </div>
        <div className="rounded-xl border p-6 grid sm:grid-cols-2 gap-4">
          {cards.map((c) => (
            <Link key={c.href} to={c.href} className="rounded-lg border p-4 hover:shadow-md transition">
              <h4 className="font-semibold">{c.title}</h4>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const cards = [
  { title: "Mentors", desc: "Search by skill, rating, or availability.", href: "/bridgehub/mentors" },
  { title: "Sessions", desc: "Calendar UI with reminders.", href: "/bridgehub/sessions" },
  { title: "Forum", desc: "Ask questions and mark accepted answers.", href: "/bridgehub/forum" },
  { title: "Resources", desc: "Curated roadmaps and guides.", href: "/bridgehub/resources" },
  { title: "Leaderboard", desc: "Earn points and badges.", href: "/bridgehub/leaderboard" },
];
