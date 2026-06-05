/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
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

export interface ContactSubmission {
  name: string;
  email: string;
  interest: string;
}
