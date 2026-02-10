import { Request, Response } from "express";
import { PollService } from "../service/poll.service";

const pollService = new PollService();

export const createPoll = async (req: Request, res: Response) => {
  try {
    const { question, options, createdBy, roomId, expiresAt } = req.body;
    if (!question || !Array.isArray(options) || options.length < 2 || !createdBy || !roomId || !expiresAt) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const poll = await pollService.createPoll({
      question,
      options,
      createdBy,
      roomId,
      expiresAt: new Date(expiresAt)
    });

    return res.status(201).json(poll);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create poll" });
  }
};

export const getPoll = async (req: Request, res: Response) => {
  try {
    const poll = await pollService.getPoll(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found or expired" });
    return res.json(poll);
  } catch {
    return res.status(500).json({ message: "Failed to fetch poll" });
  }
};

export const votePoll = async (req: Request, res: Response) => {
  try {
    const { optionId } = req.body;
    if (!optionId) return res.status(400).json({ message: "optionId is required" });

    const poll = await pollService.vote(req.params.id, optionId);
    if (!poll) return res.status(404).json({ message: "Poll not found or expired" });
    return res.json(poll);
  } catch {
    return res.status(500).json({ message: "Failed to vote" });
  }
};
