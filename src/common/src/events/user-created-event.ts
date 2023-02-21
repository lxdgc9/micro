import { Subjects } from "./types/subjects";

export interface UserCreatedEvent {
  subject: Subjects.UserCreated;
  data: {
    username: string;
    phone: string;
    email: string;
    password: string;
    userId: string;
  };
}
