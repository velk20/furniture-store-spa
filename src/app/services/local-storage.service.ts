import {Injectable} from "@angular/core";
import {JwtToken} from "../model/jwt";
import {Constant} from "./constant";
import {jwtDecode} from "jwt-decode"
import {UserService} from "./user.service";
import {User} from "../model/user";
import {retry} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(private userService:UserService) {
  }
  isLoggedIn: boolean = false;
  currentUser: User = {} as User;

  getCurrentUser(): User | null {
    let jwtToken: string | null = this.getJwtToken();
    if (jwtToken !== null) {
      const {email} = this.getDecodedAccessToken(jwtToken);
      let user: User | undefined = {} as User;
      let observable = this.userService.getAll();

      observable.subscribe(userData => {
        console.log(userData)
        this.currentUser = userData.find(u => u.email === email) || {} as User;
        });
      return this.currentUser;
    }
    debugger;
    return null
  }
  setJwtToken(jwt:JwtToken):void {
    localStorage.setItem(Constant.LS_JWT_NAME, jwt.accessToken);
    this.isLoggedIn = true;
  }

  getJwtToken(): string | null {
    return localStorage.getItem(Constant.LS_JWT_NAME);
  }

  removeJwtToken(): void {
    localStorage.removeItem(Constant.LS_JWT_NAME);
    this.isLoggedIn = false;
  }

  isUserLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }
}
