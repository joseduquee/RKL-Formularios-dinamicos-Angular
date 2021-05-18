import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CompletedUserFormDetails } from 'src/app/Models/Form/CompletedUserFormDetails';
import { CompletedUserForm } from 'src/app/Models/Form/CompletedUserFormModel';
import { FormService } from '../../../Services/form.service';
import { FormModel } from '../../../Models/Form/FormModel';
import { UserModel } from '../../../Models/Account/UserModel';
import { AuthServiceService } from '../../../Services/auth-service.service';

@Component({
  selector: 'app-final-form',
  templateUrl: './final-form.component.html',
  styleUrls: ['./final-form.component.css']
})
export class FinalFormComponent implements OnInit {

  public uniqueId: string = '';
  public form: FormModel;
  private currentUser: UserModel;
  @ViewChild('success') private success: SwalComponent;

  constructor(private activatedRoute: ActivatedRoute, private formService: FormService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.uniqueId = param.uniqueId;
    });

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    if (this.currentUser.roles.includes("SuperAdmin")) {
      this.formService.getMasterFormByUniqueId(this.uniqueId).subscribe(res => {
        this.form = res.data;
      });
    } else {
      this.formService.getFormByUniqueId(this.uniqueId).subscribe(res => {
        this.form = res.data;
      });
    }

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

}
