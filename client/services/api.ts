export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = API_BASE ? `${API_BASE}${path}` : path;
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  bio: string;
}

export interface ForumPost {
  id: string;
  title: string;
  body: string;
  votes: number;
  accepted: boolean;
}

export const Services = {
  async listMentors(): Promise<Mentor[]> {
    // Mock data; replace with request<Mentor[]>("/mentors")
    return [
      {
        id: "m1",
        name: "Aarav Sharma",
        expertise: ["React", "Node", "Career"],
        rating: 4.9,
        bio: "Senior engineer mentoring full‑stack and interviews.",
      },
      {
        id: "m2",
        name: "Isha Verma",
        expertise: ["Python", "Data Science"],
        rating: 4.8,
        bio: "Data scientist guiding ML roadmaps and projects.",
      },
      {
        id: "m3",
        name: "Ravi Kumar",
        expertise: ["DevOps", "Cloud"],
        rating: 4.7,
        bio: "Cloud architect helping with AWS and CI/CD.",
      },
    ];
  },
  async listForum(): Promise<ForumPost[]> {
    return [
      {
        id: "q1",
        title: "How to prepare for frontend interviews?",
        body: "Strategies for DSA vs projects?",
        votes: 12,
        accepted: true,
      },
      {
        id: "q2",
        title: "Best roadmap for Data Science?",
        body: "From beginner to job‑ready path.",
        votes: 7,
        accepted: false,
      },
    ];
  },
};

export const CodeTranslateAPI = {
  async translate(_code: string, _from: string, _to: string): Promise<string> {
    // Replace with request<string>("/code/translate", { method: "POST", body: ... })
    await new Promise((r) => setTimeout(r, 500));
    return `// Translated (${_from} → ${_to})\n` + _code;
  },
  async explain(code: string, lang: string): Promise<string> {
    await new Promise((r) => setTimeout(r, 500));
    return `Explanation for ${lang}:\n` + code
      .split("\n")
      .map((l, i) => `${i + 1}. ${l ? l : "(blank)"}`)
      .join("\n");
  },
};

export const ExplainerAPI = {
  async upload(_file: File): Promise<{ id: string; pages: number }> {
    await new Promise((r) => setTimeout(r, 800));
    return { id: crypto.randomUUID(), pages: 8 };
  },
  async narrate(_id: string, _text: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 500));
  },
};
