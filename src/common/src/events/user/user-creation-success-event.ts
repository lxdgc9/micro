import { Subjects } from "../subjects";

interface UserCreationSuccessEvent {
  subject: Subjects.UserServiceUserCreationSuccess;
  data: {
    userId: string;
    username: string;
    password: string;
  };
}

export { UserCreationSuccessEvent };
