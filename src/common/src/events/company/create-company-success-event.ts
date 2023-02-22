import { Subjects } from "../subjects";

interface CreateCompanySuccessEvent {
  subject: Subjects.CompanySrvCreateCompanySuccess;
  data: {
    companyId: string;
    name: string;
    doe?: Date;
    avatar?: string;
  };
}

export { CreateCompanySuccessEvent };
