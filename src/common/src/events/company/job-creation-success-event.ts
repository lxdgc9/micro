import { Subjects } from "../subjects";

interface JobCreationSuccessEvent {
  subject: Subjects.CompanyServiceJobCreationSuccess;
  data: {
    companyId: string;
    departmentId: string;
    name: string;
  };
}

export { JobCreationSuccessEvent };
