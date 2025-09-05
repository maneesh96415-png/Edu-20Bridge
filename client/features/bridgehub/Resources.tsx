const resources = [
  { title: "Frontend Roadmap 2025", desc: "Modern stack, references, and projects.", href: "#" },
  { title: "Data Science Guide", desc: "From Python to MLOps.", href: "#" },
  { title: "DevOps Checklist", desc: "CI/CD, IaC, Observability.", href: "#" },
];

export default function ResourcesPage() {
  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold">Resources</h2>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(r => (
          <a key={r.title} href={r.href} className="rounded-lg border p-4 hover:shadow-md transition">
            <h3 className="font-semibold">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
