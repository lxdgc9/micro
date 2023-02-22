import { Subjects } from "../subjects";

interface CreateJobSuccessEvent {
  subject: Subjects.CompanySrvCreateJobSuccess;
  data: {
    jobId: string;
    departmentId: string;
    name: string;
  };
}

export { CreateJobSuccessEvent };
