import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../Services/form.service';
import { FormModel } from '../../../Models/Form/FormModel';
import { UserModel } from '../../../Models/Account/UserModel';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { DomainName } from 'src/app/Utilities/PathTools';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {
  public currentUser: UserModel;
  public forms: FormModel[] = [];
  public form: FormModel = null;
  public URL = DomainName;
  constructor(private formService: FormService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    });

    if(this.currentUser !== null && this.currentUser.roles.includes("SuperAdmin")){
      this.formService.getMasterForms().subscribe(res => {
        res.data.forEach(form => {
          this.forms.push(form);
        });
      });
    }else{
      this.formService.getForms().subscribe(res => {
        res.data.forEach(form => {
          this.forms.push(form);
        });
      });
    }

  }

  selectForm(e) {
    var form = this.forms.filter(f => f.formId === parseInt(e.target.value))[0];
    this.form = form;
  }

  deleteForm(formId: number) {
    this.formService.deleteForm(formId).subscribe(res => {
      if (res.status === "Success") {
        this.forms = this.forms.filter(f => f.formId !== formId);
        this.form = null;
      }
    });
    this.formService.getForms().subscribe(res => {
      if (res.status === "Success") {
        this.forms = [];
        for (let i = 0; i < res.data.length; i++) {
          this.forms.push(res.data[i]);
        }
      }
    });
  }

  deleteMasterForm(formId: number) {
    this.formService.deleteMasterForm(formId).subscribe(res => {
      if (res.status === "Success") {
        this.forms = this.forms.filter(f => f.formId !== formId);
        this.form = null;
      }
    });

    this.formService.getMasterForms().subscribe(res => {
      if (res.status === "Success") {
        this.forms = [];
        for (let i = 0; i < res.data.length; i++) {
          this.forms.push(res.data[i]);
        }
      }
    });
  }

  activeForm(formId: number) {
    this.formService.setActiveForm(formId).subscribe(res => {
      console.log(res);
    });
  }

  getLink(uniqueId : string){
    console.log(uniqueId);
    
  }

}
