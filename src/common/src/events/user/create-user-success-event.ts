import { Subjects } from "../subjects";

interface CreateUserSuccessEvent {
  subject: Subjects.UserSrvCreateUserSuccess;
  data: {
    userId: string;
    username: string;
    password: string;
  };
}

export { CreateUserSuccessEvent };
