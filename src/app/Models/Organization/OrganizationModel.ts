export class OrganizationModel{
    constructor(
        public id : number,
        public title : string,
        public name: string ,
        public phoneNumber: string ,
        public address: string ,
        public uniqueId: string ,
        public isPrivate:boolean
    ){}
}