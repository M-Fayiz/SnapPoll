import { PollController } from "../controller/poll.controller";
import { pollService } from "./service";

export const pollController = new PollController(pollService);
