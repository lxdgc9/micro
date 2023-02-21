import { Subjects } from "./subjects";

interface UserCreationSuccessEvent {
  subject: Subjects.UserCreationSuccess;
  data: {
    username: string;
    password: string;
    userId: string;
  };
}

export { UserCreationSuccessEvent };
