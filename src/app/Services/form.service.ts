import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseStatus } from '../Models/Common/IResponseStatus';
import { Observable } from 'rxjs';
import { FormModel } from '../Models/Form/FormModel';
import { CompletedUserForm } from '../Models/Form/CompletedUserFormModel';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) { }

  postForm(form: FormModel): Observable<IResponseStatus<any>> {
    return this.http.post<IResponseStatus<any>>('/api/form/save-form', form);
  }

  postMasterForm(form: FormModel): Observable<IResponseStatus<any>> {
    return this.http.post<IResponseStatus<any>>('/api/SuperAdmin/save-master-form', form);
  }

  getForms(): Observable<IResponseStatus<FormModel[]>> {
    return this.http.get<IResponseStatus<FormModel[]>>('/api/form/get-forms');
  }

  getMasterForms(): Observable<IResponseStatus<FormModel[]>> {
    return this.http.get<IResponseStatus<FormModel[]>>('/api/SuperAdmin/get-master-forms');
  }

  deleteForm(formId: number): Observable<IResponseStatus<any>> {
    const data = new FormData();
    data.append('formId', formId.toString());
    return this.http.post<IResponseStatus<any>>('/api/form/delete-form', data);
  }

  deleteMasterForm(formId: number): Observable<IResponseStatus<any>> {
    const data = new FormData();
    data.append('formId', formId.toString());
    return this.http.post<IResponseStatus<any>>('/api/SuperAdmin/delete-master-form', data);
  }

  getForm(formId: number): Promise<IResponseStatus<FormModel>> {
    const form = new FormData();
    form.append('formId', formId.toString());
    return this.http.post<IResponseStatus<FormModel>>('/api/form/get-form', form).toPromise();
  }

  getMasterFormByUniqueId(uniqueId : string) : Observable<IResponseStatus<FormModel>>{
    const data = new FormData();
    data.append('uniqueId', uniqueId);
    return this.http.post<IResponseStatus<FormModel>>('/api/superAdmin/get-form-by-unique-id', data);
  }

  getFormByUniqueId(uniqueId : string) : Observable<IResponseStatus<FormModel>>{
    const data = new FormData();
    data.append('uniqueId', uniqueId);
    return this.http.post<IResponseStatus<FormModel>>('/api/form/get-form-by-unique-id', data);
  }

  saveUserCompletedForm(form: CompletedUserForm): Observable<IResponseStatus<any>>{
    return this.http.post<IResponseStatus<FormModel>>('/api/form/save-user-form', form);
  }

  getUsersPosts(): Promise<IResponseStatus<CompletedUserForm[]>>{
    return this.http.get<IResponseStatus<CompletedUserForm[]>>('/api/form/get-users-forms').toPromise();
  }

  setActiveForm(formId : number) : Observable<IResponseStatus<any>> {
    const form = new FormData();
    form.append('formId', formId.toString());
    return this.http.post<IResponseStatus<FormModel>>('/api/form/active-form', form);
  }

  getActiveForm(): Promise<IResponseStatus<FormModel>> {
    return this.http.get<IResponseStatus<FormModel>>('/api/form/get-active-form').toPromise();
  }

  getFormsCount() : Promise<number>{
    return this.http.get<number>('/api/form/get-forms-count').toPromise();
  }

}
