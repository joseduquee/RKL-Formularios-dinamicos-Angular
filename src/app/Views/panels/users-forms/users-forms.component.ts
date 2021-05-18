import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../Services/form.service';
import { CompletedUserForm } from '../../../Models/Form/CompletedUserFormModel';
import { UserModel } from '../../../Models/Account/UserModel';
import { AuthServiceService } from '../../../Services/auth-service.service';

@Component({
  selector: 'app-users-forms',
  templateUrl: './users-forms.component.html',
  styleUrls: ['./users-forms.component.css']
})
export class UsersFormsComponent implements OnInit {

  public currentUser: UserModel;
  public usersForms: CompletedUserForm[] = [];
  constructor(private formService: FormService, private authService: AuthServiceService) { }

  async ngOnInit(): Promise<void> {
    await this.formService.getUsersPosts().then(res => {
      this.usersForms = res.data.reverse()

    })

    this.authService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    });
  }



}
