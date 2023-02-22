import { Subjects } from "../subjects";

interface CompanyCreationSuccessEvent {
  subject: Subjects.CompanyServiceCompanyCreationSuccess;
  data: {
    companyId: string;
    name: string;
    doe?: Date;
    avatar?: string;
  };
}

export { CompanyCreationSuccessEvent };
