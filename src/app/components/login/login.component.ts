import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  onSubmit() {
    this.userService.login(this.loginForm.value as User).subscribe(
      (res) => {
        this.localStorageService.setJwtToken(res);
        this.toastrService.success('Login is successful!');
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastrService.error('Incorrect username/password!');
        this.loginForm.reset();
      }
    );
  }
}
