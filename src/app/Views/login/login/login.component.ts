import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginModel } from '../../../Models/Account/UserLoginModel';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  @ViewChild('error') private error: SwalComponent;
  constructor(private authService: AuthServiceService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(null,
        [
          Validators.email,
          Validators.required
        ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(150)
      ])
    });

    this.authService.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.router.navigate(["/adminpanel"]);
      }
    });

  }

  loginUser() {
    const user = new UserLoginModel(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    )
    this.authService.loginUser(user).subscribe(res => {
      if (res.status === "Success") {
        this.cookieService.set("b0059215-7da3-4574-8542-945cd4094477", res.data.token, res.data.expireTime * 60);
        this.loginForm.reset();
        this.authService.setCurrentUser(res.data);
        console.log(res.data);
        
        
        // if (res.data.roles.includes("SuperAdmin"))
        //   this.router.navigate(["/adminpanel"]);
        // else
        //   this.router.navigate(["/panel"]);

      } else if (res.status === "NotFound") {
        this.error.text = "El Email Introducido no existe";
        this.error.fire();
      } else {
        this.error.text = "La cuenta no esta activo";
        this.error.fire();
      }
    });
  }

}
