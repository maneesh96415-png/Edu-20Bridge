import { Mentor, ForumPost } from "@shared/api";
export type { Mentor, ForumPost };

export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = API_BASE ? `${API_BASE}${path}` : path;
  const res = await fetch(url, init);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export const Services = {
  async listMentors(): Promise<Mentor[]> {
    return request<Mentor[]>("/api/mentors");
  },
  async listForum(): Promise<ForumPost[]> {
    return request<ForumPost[]>("/api/forum");
  },
};

export const CodeTranslateAPI = {
  async translate(code: string, from: string, to: string): Promise<string> {
    const res = await request<{ translated: string }>("/api/code/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, from, to }),
    });
    return res.translated;
  },
  async explain(code: string, lang: string): Promise<string> {
    const res = await request<{ explanation: string }>("/api/code/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, lang }),
    });
    return res.explanation;
  },
  async run(code: string, lang: string): Promise<string> {
    const res = await request<{ output: string }>("/api/code/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, lang }),
    });
    return res.output;
  },
};

export const ExplainerAPI = {
  async upload(file: File): Promise<{ id: string; pages: number }> {
    return request<{ id: string; pages: number }>("/api/explainer/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, size: file.size }),
    });
  },
  async narrate(id: string, text: string): Promise<void> {
    return request<void>("/api/explainer/narrate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text }),
    });
  },
};

export const ContactAPI = {
  async submit(name: string, email: string, interest: string): Promise<{ message: string }> {
    return request<{ message: string }>("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, interest }),
    });
  },
};
