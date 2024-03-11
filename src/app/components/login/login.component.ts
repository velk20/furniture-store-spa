import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  login(event: MouseEvent, email: string, password: string) {
    event.preventDefault();
    this.userService.login({email, password}).subscribe(
      res => {
        this.localStorageService.setJwtToken(res);
        this.router.navigate(['/']);
      },
      error => {
        console.log(`Error while Logging: `, error);
      }
    );
  }
}
