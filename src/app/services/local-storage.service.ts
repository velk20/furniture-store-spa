import {Injectable} from "@angular/core";
import {JwtToken} from "../model/jwt";
import {Constant} from "./constant";
import {jwtDecode} from "jwt-decode"
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }
  isLoggedIn: boolean = false;

  getCurrentUserIdFromJwt():number | null {
    let jwtToken: string | null = this.getJwtToken();

    if (jwtToken !== null) {
      const {sub} = this.getDecodedAccessToken(jwtToken);
      return Number(sub);
    }
    return null;
  }

  getCurrentUserEmailFromJwt():string | null {
    let jwtToken: string | null = this.getJwtToken();

    if (jwtToken !== null) {
      const {email} = this.getDecodedAccessToken(jwtToken);
      return email;
    }
    return null;
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
