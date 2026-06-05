import { RequestHandler } from "express";
import { Mentor, ForumPost } from "@shared/api";

const mentors: Mentor[] = [
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

const forumPosts: ForumPost[] = [
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

export const handleListMentors: RequestHandler = (_req, res) => {
  res.status(200).json(mentors);
};

export const handleListForum: RequestHandler = (_req, res) => {
  res.status(200).json(forumPosts);
};
