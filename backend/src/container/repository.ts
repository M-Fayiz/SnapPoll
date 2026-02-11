import { MessageRepository } from "../repository/implementation/message.repository";
import { PollRepository } from "../repository/implementation/poll.repository";

export const pollRepository = new PollRepository();
export const messageRepository = new MessageRepository();
