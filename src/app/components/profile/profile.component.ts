import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  profileForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: [this.user.password],
    isAdmin: [this.user.isAdmin],
    id: [this.user.id],
    likedItems: [this.user.likedItems],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
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
    this.userService.update(this.user.id, editedUser).subscribe(
      (newUser) => {
        this.user = newUser;
      },
      (error) => {
        this.toastrService.error('Profile was not updated successful!');
      }
    );

    this.toastrService.success('Profile was updated successful!');
    this.router.navigate([`/`]);
  }

  deleteProfile(userId: number) {
    if (confirm('Are you sure you want to delete your profile?')) {
      console.log(userId);
      this.userService.delete(userId).subscribe(
        () => {
          this.toastrService.success('Profile was deleted!');
          this.localStorageService.removeJwtToken();
          this.router.navigate(['/']);
        },
        (error) => {
          this.toastrService.error('Error while deleting profile!');
        }
      );
    }
  }
}
