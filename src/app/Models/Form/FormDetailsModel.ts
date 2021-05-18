export class FormDetailsModel {
    constructor(
       public displayName: string,
       public displayOrder: number,
       public required: boolean,
       public elementId: string,
       public type: string,
       public readOnly: boolean
    ) { }
}