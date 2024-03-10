import { Component } from '@angular/core';
import { User } from '../../model/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.css'],
})
export class ProfileChangePasswordComponent {
  user: User = {} as User;
  passwordForm: FormGroup = this.formBuilder.group({
    oldPassword: [''],
    newPassword: [''],
    rePassword: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location,
  ) {}

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
    console.log(this.passwordForm.value.oldPassword);
    console.log(this.user.password);

    bcrypt
      .compare(this.passwordForm.value.oldPassword, this.user.password)
      .then((e) => {
        if (e) {
          //TODO
        } else {
          console.log('Wrong old password!');
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
