import { Subjects } from "../subjects";

interface DepartmentCreationSuccessEvent {
  subject: Subjects.CompanyServiceDepartmentCreationSuccess;
  data: {
    departmentId: string;
    companyId: string;
    name: string;
  };
}

export { DepartmentCreationSuccessEvent };
