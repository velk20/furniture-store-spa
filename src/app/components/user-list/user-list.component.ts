import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { User } from 'src/app/model/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userService: UserService,
    private ls: LocalStorageService
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
    //TODO
  }

  makeAdmin(id: number) {
    //TODO
  }
}
