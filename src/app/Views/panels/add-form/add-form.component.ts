import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Models/Account/UserModel';
import { FormDetailsModel } from 'src/app/Models/Form/FormDetailsModel';
import { FormModel } from 'src/app/Models/Form/FormModel';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { FormService } from 'src/app/Services/form.service';

declare function dragAndDrop();
declare function spanClick();
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  public currentUser: UserModel;
  public formDetails: FormDetailsModel[] = [];
  constructor(private authService: AuthServiceService, private formService: FormService, private ngZone: NgZone, private router: Router) { }
  ngOnInit(): void {
    window['getFormDetails'] = { component: this, zone: this.ngZone, getFormDetails: (formDetails, formName) => this.getFormsDetailsFromJS(formDetails, formName) };

    this.authService.getCurrentUser().subscribe(res => {
      if (res !== null) {
        this.currentUser = res;
      }
    });

    dragAndDrop();
    spanClick();
    document.getElementById("reset-btn").setAttribute("onclick", "resetForm(this)");
    document.getElementById("submit-btn").setAttribute("onclick", "submitForm(this)");
  }


  getFormsDetailsFromJS(formDetails, formName) {

    this.formDetails = [];
    let selectedOpts = "";
    let order = 1;
    for (let i = 0; i < formDetails.length; i++) {
      if (i + 1 > formDetails.length) {
        break;
      }
      if (formDetails[i + 1].localName === "select") {
        if (formDetails[i + 1].innerHTML !== null) {
          for (let k = 0; k < formDetails[i + 1].childNodes.length; k++) {
            if (formDetails[i + 1].childNodes[k].innerHTML !== undefined) {
              selectedOpts += formDetails[i + 1].childNodes[k].innerHTML + ",";
            };
          }
          selectedOpts = selectedOpts.substring(0, selectedOpts.length - 1)
        }
        this.formDetails.push(new FormDetailsModel(formDetails[i].innerHTML, order++, false, formDetails[i].innerHTML, "option," + selectedOpts, false))
        i++;
      } else {
        this.formDetails.push(new FormDetailsModel(formDetails[i].innerHTML, order++, false, formDetails[i].innerHTML, formDetails[i + 1].type, false))
        i++;
      }
    }

    if(this.currentUser.roles.includes("SuperAdmin")){
      let form = new FormModel(
        0, formName,'', false, 0, this.formDetails
      );
      this.formService.postMasterForm(form).subscribe(res => {
        if (res.status === "Success") {
          this.router.navigate(["/view-forms"])
        }
      });
    } else {
      let form = new FormModel(
        0, formName,this.currentUser.organizations[0].uniqueId, false, 0, this.formDetails
      );
      this.formService.postForm(form).subscribe(res => {
        if (res.status === "Success") {
          this.router.navigate(["/view-forms"])
        }
      });
    }
  }

}
