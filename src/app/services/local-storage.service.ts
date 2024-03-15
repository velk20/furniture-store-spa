import {Injectable} from "@angular/core";
import {JwtTokenWithUser} from "../model/jwt";
import {Constant} from "./constant";
import {jwtDecode} from "jwt-decode"
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  getCurrentUserIdFromJwt(): number | null {
    let jwtToken: string | null = this.getJwtToken();

    if (jwtToken !== null) {
      const {sub} = this.getDecodedAccessToken(jwtToken);
      return Number(sub);
    }
    return null;
  }

  getCurrentUserEmailFromJwt(): string | null {
    let jwtToken: string | null = this.getJwtToken();

    if (jwtToken !== null) {
      const {email} = this.getDecodedAccessToken(jwtToken);
      return email;
    }
    return null;
  }

  setJwtToken(jwt: JwtTokenWithUser): void {
    localStorage.setItem(Constant.LS_JWT_NAME, jwt.accessToken);
    localStorage.setItem(Constant.LS_USER, JSON.stringify(jwt.user));
  }

  getJwtToken(): string | null {
    return localStorage.getItem(Constant.LS_JWT_NAME);
  }

  removeJwtToken(): void {
    localStorage.clear()
  }

  isUserLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  isUserAdmin(): boolean {
    let parsedUser = JSON.parse(localStorage.getItem(Constant.LS_USER) || '{}') as User;
    return parsedUser.isAdmin;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }


}
