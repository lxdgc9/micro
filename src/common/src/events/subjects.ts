enum Subjects {
  UserServiceUserCreationSuccess = "user_service:user:creation:success",
  UserServiceUserCreationFailure = "user_service:user:creation:failure",

  AuthServiceAccountCreationSuccess = "auth_service:account:creation:success",
  AuthServiceAccountCreationFailure = "auth_service:account:creation:failure",

  CompanyServiceCompanyCreationSuccess = "company_service:company:creation:success",
  CompanyServiceDepartmentCreationSuccess = "company_service:department:creation:success",
  CompanyServiceJobCreationSuccess = "company_service:job:creation:success",
}

export { Subjects };
