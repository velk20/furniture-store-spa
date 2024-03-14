import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRegister } from '../../model/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rePassword: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    isAdmin: [false],
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  onSubmit() {
    if (
      this.registerForm.value.password !== this.registerForm.value.rePassword
    ) {
      this.toastrService.error("Password and Repeat Password doesn't match!");
      this.registerForm.controls.password.setValue('');
      this.registerForm.controls.rePassword.setValue('');
      return;
    }

    let newUser = this.registerForm.value as UserRegister;
    newUser.likedItems = [];
    this.userService.register(newUser).subscribe(
      (res) => {
        this.toastrService.success('Registration was successful!');
        this.localStorageService.setJwtToken(res);
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastrService.error('Registration was not successful!');
      }
    );
  }
}
