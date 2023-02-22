import { Subjects } from "../subjects";

interface UpdateDepartmentSuccessEvent {
  subject: Subjects.CompanySrvUpdateDepartmentSuccess;
  data: {
    departmentId: string;
    companyId: string;
    name: string;
  };
}

export { UpdateDepartmentSuccessEvent };
