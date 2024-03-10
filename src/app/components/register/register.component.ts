import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRegister } from '../../model/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    isAdmin: new FormControl(false),
  });

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  onSubmit() {
    const newUser: UserRegister = {
      username: this.registerForm.value['username'] || '',
      email: this.registerForm.value['email'] || '',
      password: this.registerForm.value['password'] || '',
      firstName: this.registerForm.value['firstName'] || '',
      lastName: this.registerForm.value['lastName'] || '',
      phone: this.registerForm.value['phone'] || '',
      isAdmin: this.registerForm.value['isAdmin'] || false,
      likedItems: [],
    };

    this.userService.register(newUser).subscribe((jwt) => {
      this.localStorageService.setJwtToken(jwt);
      this.router.navigate(['/']);
    });
  }
}
