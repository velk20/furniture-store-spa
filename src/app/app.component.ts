import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {UserLogin, UserRegister} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'furniture-store-spa';
}
