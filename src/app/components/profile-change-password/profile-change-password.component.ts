import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Location} from '@angular/common';
import * as bcrypt from 'bcryptjs';
import {LocalStorageService} from '../../services/local-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.css'],
})
export class ProfileChangePasswordComponent implements OnInit {
  user: User = {} as User;
  passwordForm: FormGroup = this.formBuilder.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    rePassword: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const userId = params['id'];
      console.log(userId);
      this.userService.getOne(userId).subscribe((user) => {
        this.user = user;
      });
    });
  }

  onSubmit() {
    bcrypt
      .compare(this.passwordForm.value.oldPassword, this.user.password)
      .then((e) => {
        if (e) {
          if (
            this.passwordForm.value.newPassword !==
            this.passwordForm.value.rePassword
          ) {
            this.toastrService.error('Wrong repeat password!');
            this.passwordForm.reset();
          } else {
            this.user.password = this.passwordForm.value.newPassword;
            this.userService.update(this.user.id, this.user).subscribe(
              (user) => {
                this.toastrService.success(
                  'User updated their password successfully!'
                );
                this.localStorageService.removeJwtToken();
                this.router.navigate(['/login']);
              },
              (error) => {
                this.toastrService.error('Error while changing passwords!');
                this.passwordForm.reset();
              }
            );
          }
        } else {
          this.toastrService.error('Wrong old password!');
          this.passwordForm.reset();
        }
      })
      .catch((e) => {
        console.log('Error: ', e);
      });
  }

  goBack() {
    this.location.back();
  }
}
