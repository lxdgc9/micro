import { Subjects } from "../subjects";

interface JobCreationSuccessEvent {
  subject: Subjects.CompanyServiceJobCreationSuccess;
  data: {
    jobId: string;
    departmentId: string;
    name: string;
  };
}

export { JobCreationSuccessEvent };
