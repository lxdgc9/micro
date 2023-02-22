import { Subjects } from "../subjects";

interface UpdateCompanySuccessEvent {
  subject: Subjects.CompanySrvUpdateCompanySuccess;
  data: {
    companyId: string;
    name: string;
    doe?: Date;
    avatar?: string;
  };
}

export { UpdateCompanySuccessEvent };
