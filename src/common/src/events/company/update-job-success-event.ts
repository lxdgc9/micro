import { Subjects } from "../subjects";

interface UpdateJobSuccessEvent {
  subject: Subjects.CompanySrvUpdateJobSuccess;
  data: {
    jobId: string;
    departmentId: string;
    name: string;
  };
}

export { UpdateJobSuccessEvent };
