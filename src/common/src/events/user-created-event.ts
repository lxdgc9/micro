import { Subjects } from "./types/subjects";

export interface UserCreatedEvent {
  subject: Subjects.UserCreated;
  data: {
    id: string;
    username: string;
    password: string;
  };
}
