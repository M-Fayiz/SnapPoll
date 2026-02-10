import { Router } from "express";
import pollRoutes from "./poll.routes";
import chatRoutes from "./chat.routes";

const router = Router();

router.use("/polls", pollRoutes);
router.use("/polls", chatRoutes);

export default router;
