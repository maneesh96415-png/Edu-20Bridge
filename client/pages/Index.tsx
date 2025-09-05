import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/50">
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
              Unified learning platform
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
              Edu Bridge
              <span className="block bg-gradient-to-r from-primary via-sky-500 to-violet-500 bg-clip-text text-transparent">Mentorship · AI · Careers</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-prose">
              A multi‑feature frontend bundling BridgeHub, CodeTranslate AI, Explainer Bot, and Career Explorer — ready for backend integration.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><Link to="/bridgehub">Explore BridgeHub</Link></Button>
              <Button variant="secondary" asChild><Link to="/code-translate">Try CodeTranslate</Link></Button>
            </div>
          </div>
          <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.5}} className="relative">
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/20 via-sky-400/20 to-purple-400/20 ring-1 ring-border"/>
            <div className="absolute -bottom-6 -left-6 hidden md:block h-28 w-28 rounded-xl bg-gradient-to-tr from-sky-500/30 to-purple-500/30 blur-2xl"/>
          </motion.div>
        </div>
      </section>

      <section className="container grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
        {features.map((f) => (
          <Link key={f.href} to={f.href} className="group rounded-xl border bg-card p-6 ring-1 ring-transparent transition hover:shadow-md">
            <div className={`h-10 w-10 rounded-md ${f.bg}`}></div>
            <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            <span className="mt-4 inline-flex items-center text-sm text-primary">Open →</span>
          </Link>
        ))}
      </section>
    </div>
  );
}

const features = [
  { title: "BridgeHub", desc: "Mentors, sessions, forum, resources, and leaderboard.", href: "/bridgehub", bg: "bg-gradient-to-br from-primary/30 to-sky-500/30" },
  { title: "CodeTranslate AI", desc: "Translate or explain code with Monaco editors.", href: "/code-translate", bg: "bg-gradient-to-br from-emerald-400/30 to-teal-500/30" },
  { title: "Explainer Bot", desc: "Upload slides, generate script, and narrate.", href: "/explainer-bot", bg: "bg-gradient-to-br from-purple-400/30 to-fuchsia-500/30" },
  { title: "Career Explorer", desc: "Streams, exams, scope, and contact.", href: "/career-explorer", bg: "bg-gradient-to-br from-amber-400/30 to-pink-500/30" },
];
