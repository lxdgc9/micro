import { Subjects } from "./types/subjects";

export interface UserCreatedEvent {
  subject: Subjects.UserCreated;
  data: {
    username: string;
    password: string;
    userId: string;
  };
}
