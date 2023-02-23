import { Subjects } from "../subjects";

interface CreateAllowanceSuccessEvent {
  subject: Subjects.AllowanceSrvCreateAllowanceSuccess;
  data: {
    allowanceId: string;
    description: string;
    amount: number;
  };
}

export { CreateAllowanceSuccessEvent };
