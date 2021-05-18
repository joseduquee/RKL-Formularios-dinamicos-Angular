import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserModel } from '../Models/Account/RegisterUserDTO';
import { IResponseStatus } from '../Models/Common/IResponseStatus';
import { FormModel } from '../Models/Form/FormModel';
import { OrganizationModel } from '../Models/Organization/OrganizationModel';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getAllOrganizations() : Observable<IResponseStatus<OrganizationModel[]>>{
    return this.http.get<IResponseStatus<OrganizationModel[]>>('/api/SuperAdmin/get-organizations');
  }

  getOrganizationForms(organizationId : number) : Observable<IResponseStatus<FormModel[]>>{
    const data = new FormData();
    data.append('organizationId',organizationId.toString());
    return this.http.post<IResponseStatus<FormModel[]>>('/api/SuperAdmin/get-organization-forms-by-id',data);
  }

  getOrganizationFormsByUniqueId(uniqueId : string) : Observable<IResponseStatus<FormModel[]>>{
    const data = new FormData();
    data.append('uniqueId',uniqueId);
    return this.http.post<IResponseStatus<FormModel[]>>('/api/SuperAdmin/get-organization-forms',data);
  }

  addOrganization(organization : OrganizationModel) : Observable<IResponseStatus<OrganizationModel>>{
    return this.http.post<IResponseStatus<OrganizationModel>>('/api/SuperAdmin/add-organization',organization);
  }

  addAdminToOrganization(user : RegisterUserModel) : Observable<IResponseStatus<any>>{
    return this.http.post<IResponseStatus<any>>('/api/SuperAdmin/add-admin-to-organization',user);
  }
}
