import { PollService } from "../service/poll.service";
import { pollRepository } from "./repository";


export const pollService = new PollService(pollRepository)