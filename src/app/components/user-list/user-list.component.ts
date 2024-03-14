import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { User } from 'src/app/model/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userService: UserService,
    private ls: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    const email = this.ls.getCurrentUserEmailFromJwt();
    if (email) {
      this.userService
        .getAll()
        .pipe(map((users) => users.filter((user) => user.email != email)))
        .subscribe((users) => {
          this.users = users;
          console.log(users);
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      text: "You won't be able to revert this user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(() => {
          this.toastrService.success(
            'Deletion of this profile was successfully!'
          );
        });
        this.users = this.users.filter((user) => user.id !== id);
        this.router.navigate(['/users']);
      }
    });
  }

  makeAdmin(id: number) {
    //TODO
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.userService.update(id,null).subscribe(() => {
    //       this.toastrService.success('Your deletion was successfully!');
    //       this.router.navigate(['/dashboard']);
    //     });
    //   }
    // });
  }
}
