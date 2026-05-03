import { Request, Response } from 'express';

// In a real application, you would save this to a database or send an email.
// For this starter, we just log it and store it in memory.
const messages: any[] = [];

export const submitContactForm = (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
  }
  
  const newMessage = {
    id: Date.now().toString(),
    name,
    email,
    message,
    createdAt: new Date()
  };
  
  messages.push(newMessage);
  console.log('New Contact Message Received:', newMessage);
  
  res.status(201).json({ success: true, message: 'Message sent successfully' });
};
