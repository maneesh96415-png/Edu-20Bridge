import { RequestHandler } from "express";

export const handleContact: RequestHandler = (req, res) => {
  const { name, email, interest } = req.body;

  if (!name || !email || !interest) {
    res.status(400).json({ error: "Name, email, and interest fields are required" });
    return;
  }

  // Simple email format check
  if (!email.includes("@")) {
    res.status(400).json({ error: "Invalid email address format" });
    return;
  }

  console.log(`[Contact] New inquiry from ${name} (${email}). Interest: ${interest}`);

  res.status(200).json({
    message: "Thank you for reaching out! We will contact you soon.",
    success: true,
  });
};
