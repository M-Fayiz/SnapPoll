import { Request, Response } from "express";
import { IPollService } from "../service/interface/poll.service.interface";

export class PollController {
  constructor(private readonly pollService: IPollService) {}

  createPoll = async (req: Request, res: Response) => {
    try {
      const { question, options, createdBy, roomId, expiresAt } = req.body;

      const poll = await this.pollService.createPoll({
        question,
        options,
        createdBy,
        roomId,
        expiresAt: new Date(expiresAt)
      });

      return res.status(201).json(poll);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Failed to create poll" });
    }
  };

  getPoll = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const poll = await this.pollService.getPoll(id as string);
      if (!poll) return res.status(404).json({ message: "Poll not found or expired" });
      return res.json(poll);
    } catch {
      return res.status(500).json({ message: "Failed to fetch poll" });
    }
  };

  listPolls = async (_req: Request, res: Response) => {
    try {
      const polls = await this.pollService.listPolls();
      return res.json(polls);
    } catch {
      return res.status(500).json({ message: "Failed to fetch polls" });
    }
  };

  votePoll = async (req: Request, res: Response) => {
    try {
      const { optionId } = req.body;
      if (!optionId) return res.status(400).json({ message: "optionId is required" });
      const { id } = req.params;
      const poll = await this.pollService.vote(id as string, optionId);
      if (!poll) return res.status(404).json({ message: "Poll not found or expired" });
      return res.json(poll);
    } catch {
      return res.status(500).json({ message: "Failed to vote" });
    }
  };
}
