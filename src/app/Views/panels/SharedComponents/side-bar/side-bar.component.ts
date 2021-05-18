import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Models/Account/UserModel';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
public currentUser: UserModel;
  constructor(private authService: AuthServiceService,private cookieService : CookieService,private router : Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    });
  }

  logout() {
    this.cookieService.delete("b0059215-7da3-4574-8542-945cd4094477");
    this.authService.setCurrentUser(null);
    this.authService.logOut();
    this.router.navigate([""]);
  }

}
