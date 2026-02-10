import { Router } from "express";
import { getMessages, sendMessage } from "../controller/chat.controller";

const router = Router();

router.get("/:pollId/messages", getMessages);
router.post("/:pollId/messages", sendMessage);

export default router;
