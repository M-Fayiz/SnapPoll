import { Request, Response } from "express";
import { ChatService } from "../service/chat.service";

const chatService = new ChatService();

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    const messages = await chatService.getHistory(
      req.params.pollId,
      limit ? Number(limit) : 50
    );
    return res.json(messages);
  } catch {
    return res.status(500).json({ message: "Failed to load messages" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, text } = req.body;
    if (!userId || !text) {
      return res.status(400).json({ message: "Invalid payload" });
    }
    const message = await chatService.sendMessage({
      pollId: req.params.pollId,
      userId,
      text
    });
    return res.status(201).json(message);
  } catch {
    return res.status(500).json({ message: "Failed to send message" });
  }
};
