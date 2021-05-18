export class RegisterUserModel {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public confirmPassword: string,
        public OrganizationUniqueId : string
    ) { }
}