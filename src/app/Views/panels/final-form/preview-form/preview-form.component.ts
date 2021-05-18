import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CompletedUserFormDetails } from 'src/app/Models/Form/CompletedUserFormDetails';
import { CompletedUserForm } from 'src/app/Models/Form/CompletedUserFormModel';
import { FormModel } from 'src/app/Models/Form/FormModel';
import { FormService } from 'src/app/Services/form.service';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.css']
})
export class PreviewFormComponent implements OnInit {

  public uniqueId: string = '';
  public form: FormModel;
  @ViewChild('success') private success: SwalComponent;
  constructor(private activatedRoute: ActivatedRoute, private formService: FormService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.uniqueId = param.uniqueId;
    });


    this.formService.getFormByUniqueId(this.uniqueId).subscribe(res => {
      this.form = res.data;
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

}
