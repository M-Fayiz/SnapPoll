import { Router } from "express";
import { pollController } from "../container/controller";

const router = Router();

router.post("/", pollController.createPoll);
router.get("/", pollController.listPolls);
router.get("/:id", pollController.getPoll);
router.post("/:id/vote", pollController.votePoll);
router.delete("/:id", pollController.deletePoll);

export default router;
