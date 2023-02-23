import { Subjects } from "../subjects";

interface UpdateAllowanceSuccessEvent {
  subject: Subjects.AllowanceSrvUpdateAllowanceSuccess;
  data: {
    allowanceId: string;
    description: string;
    amount: number;
  };
}

export { UpdateAllowanceSuccessEvent };
