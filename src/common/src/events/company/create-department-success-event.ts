import { Subjects } from "../subjects";

interface CreateDepartmentSuccessEvent {
  subject: Subjects.CompanySrvCreateDepartmentSuccess;
  data: {
    departmentId: string;
    companyId: string;
    name: string;
  };
}

export { CreateDepartmentSuccessEvent };
