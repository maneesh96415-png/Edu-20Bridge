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
              <div
                style={{
                  display: "block",
                  backgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(to right, rgb(76, 62, 204), rgb(14, 165, 233), rgb(139, 92, 246))",
                  color: "rgba(0, 0, 0, 0)",
                  fontWeight: 800,
                }}
              >
                Mentorship · AI · Careers
              </div>
            </h1>
            <div className="mt-4 text-muted-foreground text-lg max-w-prose" style={{ lineHeight: '28px' }}>
              <p>
                This all-in one empowers you with learning, mentorship, career growth and interactive AI tools in single place
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><Link to="/bridgehub">Explore BridgeHub</Link></Button>
              <Button variant="secondary" asChild><Link to="/code-translate">Try CodeTranslate</Link></Button>
            </div>
          </div>
          <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.5}} className="relative">
            <img 
              src="/edubridge_hero.png" 
              alt="EduBridge Hero Illustration" 
              className="w-full aspect-[4/3] rounded-xl object-cover ring-1 ring-border shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 hidden md:block h-28 w-28 rounded-xl bg-gradient-to-tr from-sky-500/30 to-purple-500/30 blur-2xl -z-10"/>
          </motion.div>
        </div>
      </section>

      <section className="container grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
        {features.map((f) => (
          <Link key={f.href} to={f.href} className="group rounded-xl border bg-card p-6 ring-1 ring-transparent transition hover:shadow-md">
            <img 
              src={f.logo} 
              alt={f.title} 
              className="h-10 w-10 rounded-md object-cover shadow-sm ring-1 ring-border"
            />
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
  { title: "BridgeHub", desc: "Mentors, sessions, forum, resources, and leaderboard.", href: "/bridgehub", logo: "/logo_bridgehub.png" },
  { title: "CodeTranslate AI", desc: "Translate or explain code with Monaco editors.", href: "/code-translate", logo: "/logo_codetranslate.png" },
  { title: "Explainer Bot", desc: "Upload slides, generate script, and narrate.", href: "/explainer-bot", logo: "/logo_explainerbot.png" },
  { title: "Career Explorer", desc: "Streams, exams, scope, and contact.", href: "/career-explorer", logo: "/logo_careerexplorer.png" },
];
