import { Component, NgZone, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { UserModel } from '../../Models/Account/UserModel';
import { Router } from '@angular/router';
import { FormDetailsModel } from '../../Models/Form/FormDetailsModel';
import { FormService } from '../../Services/form.service';

@Component({
  selector: 'app-forms',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})


export class AdminPanelComponent implements OnInit {

  public totalUsersCount: number = 0;
  public totalOrganizationCount: number;
  public totalFormsCount: number;
  public currentUser: UserModel;
  public formDetails: FormDetailsModel[] = [];
  constructor(private authService: AuthServiceService, private formService: FormService, private ngZone: NgZone, private router: Router) { }

  async ngOnInit(): Promise<void> {
    // window['getFormDetails'] = { component: this, zone: this.ngZone, getFormDetails: (formDetails, formName) => this.getFormsDetailsFromJS(formDetails, formName) };

    this.authService.getCurrentUser().subscribe(res => {
      if (res !== null) {
        this.currentUser = res;
      }
    });

    await this.authService.getUsersCount().then(res => {
      this.totalUsersCount = res;
    });

    await this.formService.getFormsCount().then(res => {
      this.totalFormsCount = res;
      console.log(res);
      
    });


    // dragAndDrop();
    // spanClick();
    // document.getElementById("reset-btn").setAttribute("onclick", "resetForm(this)");
    // document.getElementById("submit-btn").setAttribute("onclick", "submitForm(this)");


  }

  // getFormsDetailsFromJS(formDetails, formName) {

  //   this.formDetails = [];
  //   let selectedOpts = "";
  //   let order = 1;
  //   for (let i = 0; i < formDetails.length; i++) {
  //     if (i + 1 > formDetails.length) {
  //       break;
  //     }
  //     if (formDetails[i + 1].localName === "select") {
  //       if (formDetails[i + 1].innerHTML !== null) {
  //         for (let k = 0; k < formDetails[i + 1].childNodes.length; k++) {
  //           if (formDetails[i + 1].childNodes[k].innerHTML !== undefined) {
  //             selectedOpts += formDetails[i + 1].childNodes[k].innerHTML + ",";
  //           };
  //         }
  //         selectedOpts = selectedOpts.substring(0, selectedOpts.length - 1)
  //       }
  //       this.formDetails.push(new FormDetailsModel(formDetails[i].innerHTML, order++, false, formDetails[i].innerHTML, "option," + selectedOpts, false))
  //       i++;
  //     } else {
  //       this.formDetails.push(new FormDetailsModel(formDetails[i].innerHTML, order++, false, formDetails[i].innerHTML, formDetails[i + 1].type, false))
  //       i++;
  //     }
  //   }
  //   let form = new FormModel(
  //     0, formName,false,0, this.formDetails
  //   );
  //   this.formService.postForm(form).subscribe(res => {
  //     if (res.status === "Success") {
  //       this.router.navigate(["/login"])
  //     }
  //   });

  // }

}
