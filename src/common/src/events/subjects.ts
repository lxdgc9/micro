enum Subjects {
  // User service
  UserSrvCreateUserSuccess = "user-srv:create:user:success",
  UserSrvCreateUserFailure = "user-srv:create:user:failure",

  // Auth service
  AuthSrvCreateAccountSuccess = "auth_srv:create:account:success",
  AuthSrvCreateAccountFailure = "auth_srv:create:account:failure",

  // Company service
  CompanySrvCreateCompanySuccess = "company_srv:create:company:success",
  CompanySrvUpdateCompanySuccess = "company_srv:update:company:success",
  CompanySrvCreateDepartmentSuccess = "company_srv:create:department:success",
  CompanySrvUpdateDepartmentSuccess = "company_srv:update:department:success",
  CompanySrvCreateJobSuccess = "company_srv:create:job:success",
  CompanySrvUpdateJobSuccess = "company_srv:update:job:success",
}

export { Subjects };
