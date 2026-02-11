import { Router } from "express";
import pollRoutes from "./poll.routes";
import chatRoutes from "./chat.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/polls", pollRoutes);
router.use("/polls", chatRoutes);
router.use("/auth", authRoutes);

export default router;
