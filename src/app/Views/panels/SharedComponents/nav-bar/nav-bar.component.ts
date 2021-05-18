import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Models/Account/UserModel';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public currentUser : UserModel
  constructor(private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    });
  }

}
