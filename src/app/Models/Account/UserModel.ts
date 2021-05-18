import { OrganizationModel } from '../Organization/OrganizationModel';

export class UserModel {
    constructor(
        public roles : string[],
        public id : number,
        public email: string,
        public firstName: string,
        public lastName: string,
        public isActive: boolean,
        public token: string,
        public expireTime: number,
        public organizations : OrganizationModel[]
    ) { }

}