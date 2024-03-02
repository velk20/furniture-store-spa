import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {UserLogin, UserRegister} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private userService:UserService) {
  }
  ngOnInit(): void {

    //! Register
    // const user:UserRegister = {
    //   firstName: 'Admin',
    //   lastName: 'Adminov',
    //   isAdmin: true,
    //   email: 'admin@admin.com',
    //   password: 'admin',
    //   username: 'admin',
    // }
  // this.userService.register(user).subscribe((token)=>{
  //   console.log(token.accessToken);
  //
  //   localStorage.setItem('access_token', token.accessToken);
  // })

    // //!Login
    // const loginUser:UserLogin={
    //   email:'admin@admin.com',
    //   password:'admin'
    // }
    // this.userService.login(loginUser).subscribe((token)=>{
    //     console.log(token.accessToken);
    //     localStorage.setItem('access_token', token.accessToken);
    //   })
  }
  title = 'furniture-store-spa';
}
