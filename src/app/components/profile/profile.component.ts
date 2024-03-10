import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  profileForm: FormGroup = this.formBuilder.group({
    username: [''],
    email: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    password: [this.user.password],
    isAdmin: [this.user.isAdmin],
    id: [this.user.id],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const userId = params['id'];
      console.log(userId);
      this.userService.getOne(userId).subscribe((user) => {
        this.profileForm.setValue(user);
        this.user = user;
      });
    });
  }

  onSubmit() {
    const editedUser: User = {
      firstName: this.profileForm.value.firstName || this.user.firstName,
      username: this.profileForm.value.username || this.user.username,
      email: this.profileForm.value.email || this.user.email,
      lastName: this.profileForm.value.lastName || this.user.lastName,
      phone: this.profileForm.value.phone || this.user.phone,
      isAdmin: this.profileForm.value.isAdmin || this.user.isAdmin,
      id: this.profileForm.value.id || this.user.id,
    } as User;

    this.userService.update(this.user.id, editedUser).subscribe((newUser) => {
      this.user = newUser;
    });

    this.router.navigate([`/`]);
  }
}
