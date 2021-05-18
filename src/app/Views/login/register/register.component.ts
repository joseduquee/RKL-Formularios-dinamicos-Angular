import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { RegisterUserModel } from '../../../Models/Account/RegisterUserDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  @ViewChild('error') private error: SwalComponent;

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {

    //Form Group
    this.registerForm = new FormGroup({
      firstName: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(50)
        ]),
      lastName: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(50)
        ]),
      email: new FormControl(null,
        [
          Validators.email,
          Validators.required
        ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(150)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(150)
      ])
    });
  }


  registerUser() {
    // this.authService.registerUser()#
    const register = new RegisterUserModel(
      this.registerForm.controls.email.value,
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.confirmPassword.value,
      ""
    );
    if(register.password !== register.confirmPassword){
      this.error.text ="Las contraseñas no coinciden";
      this.error.fire();
    }else{
      this.authService.registerUser(register).subscribe(res => {
        if (res.status === "Success") {
          this.registerForm.reset();
          this.router.navigate(["/login"]);
        }
      });
    }
  }
}




