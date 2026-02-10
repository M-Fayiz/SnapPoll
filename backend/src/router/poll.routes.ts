import { Router } from "express";
import { createPoll, getPoll, votePoll } from "../controller/poll.controller";

const router = Router();

router.post("/", createPoll);
router.get("/:id", getPoll);
router.post("/:id/vote", votePoll);

export default router;
