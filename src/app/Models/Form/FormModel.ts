import { FormDetailsModel } from './FormDetailsModel';
export class FormModel{
    constructor(
        public formId : number,
        public formName : string,
        public uniqueId : string,
        public isActive : boolean,
        public userId :number,
        public formDetailsList : FormDetailsModel[]
    ){}
}