import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {LocalStorageService} from '../../services/local-storage.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

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
    password: [''],
    isAdmin: [false],
    id: [0],
    likedItems: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const userId = params['id'];
      this.userService.getOne(userId).subscribe((user: User) => {
        this.user = user;
        this.profileForm.setValue(user);
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
      },
    );

    this.toastrService.success('Profile was updated successful!');
    this.router.navigate([`/`]);
  }

  deleteProfile(userId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your account and furniture will be deleted forever!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(userId).subscribe(
          () => {
            this.toastrService.success('Profile was deleted!');
            this.localStorageService.removeJwtToken();
            this.router.navigate(['/']);
          },
          (error) => {
            this.toastrService.error('Error while deleting profile!');
          },
        );
      }
    });
  }
}
