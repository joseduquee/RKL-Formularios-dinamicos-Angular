import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLoginModel } from '../Models/Account/UserLoginModel';
import { UserModel } from '../Models/Account/UserModel';
import { IResponseStatus } from '../Models/Common/IResponseStatus';
import { RegisterUserModel } from '../Models/Account/RegisterUserDTO';
import { ILoginUserAccount } from '../Models/Account/ILoginUserAccount';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private user : BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor(private http : HttpClient) { }

  loginUser(user : UserLoginModel) : Observable<IResponseStatus<UserModel>>{
    return this.http.post<IResponseStatus<UserModel>>('/api/account/login', user);
  }

  registerUser(info : RegisterUserModel) :  Observable<IResponseStatus<any>>{
    return this.http.post<IResponseStatus<any>>('/api/account/register', info);
  }

  setCurrentUser(user : UserModel){
    this.user.next(user);
  }

  getCurrentUser() : Observable<UserModel>{
    return this.user;
  }

  checkAuth(): Observable<ILoginUserAccount> {
    return this.http.post<ILoginUserAccount>('/api/account/check-auth', null);
  }

  getUsersCount() : Promise<number>{
    return this.http.get<number>('/api/account/get-users-count').toPromise();
  }

  logOut() {
    this.http.get<IResponseStatus<UserModel>>('/api/account/sign-out');
  }
}
