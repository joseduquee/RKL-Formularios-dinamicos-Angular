import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from '../../Services/form.service';
import { FormModel } from '../../Models/Form/FormModel';
import { CompletedUserForm } from 'src/app/Models/Form/CompletedUserFormModel';
import { CompletedUserFormDetails } from 'src/app/Models/Form/CompletedUserFormDetails';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserModel } from '../../Models/Account/UserModel';
import { AuthServiceService } from '../../Services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('success') private success: SwalComponent;
  public form: FormModel; // = new FormModel(0,null,false,0,[]);
  public currentUser: UserModel;
  constructor(private formService: FormService, private authService: AuthServiceService,private cookieService: CookieService, private router : Router) { }

  async ngOnInit(): Promise<void> {

    this.authService.getCurrentUser().subscribe(res => {
      if (res !== null) {
        this.currentUser = res;
      }
    });

    await this.formService.getActiveForm().then(res => {
      if (res.status === 'Success') {
        this.form = res.data;
      }
    });
  }

  sendUserInfo() {
    const userForm: CompletedUserForm = new CompletedUserForm(null, []);
    const form = document.getElementById('form');
    const formName = document.getElementById('formName').innerText;
    userForm.formName = formName;
    const inputs = form.querySelectorAll('input:not(.submit),select,textarea');
    for (let i = 0; i < inputs.length; i++) {
      console.log((inputs[i] as HTMLInputElement).value);
      if ((inputs[i] as HTMLInputElement).type === 'checkbox' && (inputs[i] as HTMLInputElement).checked === true) {
        const userFormDetail = new CompletedUserFormDetails((inputs[i] as HTMLInputElement).name.replace('-', ' '), 'si');
        userForm.values.push(userFormDetail);
      } else if ((inputs[i] as HTMLInputElement).type === 'checkbox' && (inputs[i] as HTMLInputElement).checked !== true) {
        const userFormDetail = new CompletedUserFormDetails((inputs[i] as HTMLInputElement).name.replace('-', ' '), 'no');
        userForm.values.push(userFormDetail);
      } else if ((inputs[i] as HTMLInputElement).type === 'radio' && (inputs[i] as HTMLInputElement).checked === true) {
        const userFormDetail = new CompletedUserFormDetails((inputs[i] as HTMLInputElement).name.replace('-', ' '), 'si');
        userForm.values.push(userFormDetail);
      } else if ((inputs[i] as HTMLInputElement).type === 'radio' && (inputs[i] as HTMLInputElement).checked !== true) {
        const userFormDetail = new CompletedUserFormDetails((inputs[i] as HTMLInputElement).name.replace('-', ' '), 'no');
        userForm.values.push(userFormDetail);
      }
      else {
        const userFormDetail = new CompletedUserFormDetails((inputs[i] as HTMLInputElement).name.replace('-', ' '), (inputs[i] as HTMLInputElement).value);
        userForm.values.push(userFormDetail);
      }
    }

    this.formService.saveUserCompletedForm(userForm).subscribe(res => {
      if (res.status === "Success") {
        this.success.fire();
      }
    });
  }

  logout() {
    this.cookieService.delete("b0059215-7da3-4574-8542-945cd4094477");
    this.authService.setCurrentUser(null);
    this.authService.logOut();
    this.router.navigate([""]);
  }

}
