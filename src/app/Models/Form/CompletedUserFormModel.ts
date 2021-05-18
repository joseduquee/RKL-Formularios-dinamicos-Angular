import { CompletedUserFormDetails } from './CompletedUserFormDetails';
export class CompletedUserForm {
    constructor(
        public formName: string,
        public values: CompletedUserFormDetails[] // public list<CompletedUserFormDetails> values {get; set;}
    ) { }
}