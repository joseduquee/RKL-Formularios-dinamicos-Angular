import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../../../Models/Account/UserModel';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { OrganizationModel } from '../../../Models/Organization/OrganizationModel';
import { OrganizationService } from '../../../Services/organization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUserModel } from '../../../Models/Account/RegisterUserDTO';
import { FormModel } from '../../../Models/Form/FormModel';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {
  @ViewChild('error') private error: SwalComponent;
  @ViewChild('success') private success: SwalComponent;
  public organizationForm: FormGroup;
  public selectedOrganizationForms : FormModel[] = [];
  public currentUser: UserModel;
  public organizations: OrganizationModel[] = [];
  private selectedOrganization: string = '';
  public newAdminForm: FormGroup;
  constructor(private authService: AuthServiceService, private organizationService: OrganizationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(res => {
      if (res === null || !res.roles.includes('SuperAdmin')) {
        this.error.text = 'lo sentimos, no tienes permiso a esta pagina!';
        this.error.fire();
        this.router.navigate[('/adminpanel')]
      } else {
        this.currentUser = res;
      }
    });

    this.organizationService.getAllOrganizations().subscribe(orgs => {
      if (orgs.status === "Success") {
        if (orgs.data.length > 0) {
          orgs.data.forEach(org => {
            this.organizations.push(org);
          });
          this.selectedOrganization = orgs.data[0].uniqueId;
        }
      }
    });

    this.organizationForm = new FormGroup({
      title: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(500)
        ]),
      name: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      phoneNumber: new FormControl(),
      address: new FormControl(),
      isPrivate: new FormControl()
    });

    this.newAdminForm = new FormGroup({
      firstName: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(500)
        ]),
      lastName: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      email: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  addOrganizacion() {
    let Organization = new OrganizationModel(
      0,
      this.organizationForm.controls.title.value,
      this.organizationForm.controls.name.value,
      this.organizationForm.controls.phoneNumber.value,
      this.organizationForm.controls.address.value,
      "",
      false
    );

    if (this.organizationForm.controls.isPrivate.value !== null)
      Organization.isPrivate = true

    this.organizationService.addOrganization(Organization).subscribe(res => {
      if (res.status === "Success") {
        this.success.fire();
        this.organizationForm.reset();
        this.organizations.push(res.data);
        document.getElementById('organization-form').classList.add('myhide');
      }
    });
  }

  agregarOrg() {
    document.getElementById('organization-form').classList.remove('myhide');
  }

  loadFormsOfOrganization() {
    const uniqueId = (document.getElementById('formselect') as HTMLInputElement).value;
    this.selectedOrganization = "";
    this.selectedOrganization = uniqueId;

    const organizationId = this.organizations.filter(o => o.uniqueId === uniqueId)[0].id;
    console.log(organizationId);

    this.organizationService.getOrganizationForms(organizationId).subscribe(res => {
      if (res.status === "Success") {
        if (res.data.length === 0) {
        }else{
          this.selectedOrganizationForms = [];
          res.data.forEach(result => {
            this.selectedOrganizationForms.push(result);
          })
        }
      }
    });
  }

  addAdmin() {
    if (document.getElementById("new-admin-form").classList.contains("myhide")) {
      document.getElementById("new-admin-form").classList.remove("myhide");
      document.getElementById("add-admin-btn").classList.remove("btn-success");
      document.getElementById("add-admin-btn").classList.add("btn-warning");
      document.getElementById("add-admin-btn").innerText = "Cancelar";
    } else {
      document.getElementById("new-admin-form").classList.add("myhide");
      document.getElementById("add-admin-btn").classList.remove("btn-warning");
      document.getElementById("add-admin-btn").classList.add("btn-success");
      document.getElementById("add-admin-btn").innerText = "añadir administrador";
    }
  }

  addNewAdmin() {
    if (this.newAdminForm.controls.password.value !== this.newAdminForm.controls.confirmPassword.value) {
      this.error.text = "Las contraseñas no son iguales"
      this.error.fire();
    } else {
      const user = new RegisterUserModel(
        this.newAdminForm.controls.email.value,
        this.newAdminForm.controls.firstName.value,
        this.newAdminForm.controls.lastName.value,
        this.newAdminForm.controls.password.value,
        this.newAdminForm.controls.confirmPassword.value,
        this.selectedOrganization
      );

      this.organizationService.addAdminToOrganization(user).subscribe(res => {
        if (res.status === "Success") {
          this.success.text = "Has añadido un administrador correctamente";
          this.success.fire();
          this.newAdminForm.reset();
          this.addAdmin();
        } else if (res.status == "NotFound") {
          this.error.text = "El usuario ya existe";
          this.error.fire();
        } else {
          this.error.text = "ha surgido algun problema, porfavor pruebalo mas tarde";
          this.error.fire();
        }
      });
    }

  }

}
