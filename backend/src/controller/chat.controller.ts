import { Request, Response } from "express";
import { chatService } from "../container/service"; 



export const getMessages = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    const { pollId } = req.params;
    const messages = await chatService.getHistory(pollId as string, limit ? Number(limit) : 50);
    return res.json(messages);
  } catch {
    return res.status(500).json({ message: "Failed to load messages" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, text } = req.body;
    const resolvedUserId = userId || (req.user as any)?._id || (req.user as any)?.id;
    if (!resolvedUserId || !text) {
      return res.status(400).json({ message: "Invalid payload" });
    }
    const message = await chatService.sendMessage({
      pollId: req.params.pollId as string,
      userId: resolvedUserId,
      text,
    });
    return res.status(201).json(message);
  } catch {
    return res.status(500).json({ message: "Failed to send message" });
  }
};
