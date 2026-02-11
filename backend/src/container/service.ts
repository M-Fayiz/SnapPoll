import { ChatService } from "../service/implementation/chat.service"; 
import { PollService } from "../service/implementation/poll.service"; 
import { messageRepository, pollRepository } from "./repository";

export const pollService = new PollService(pollRepository);

export const chatService = new ChatService(messageRepository);
