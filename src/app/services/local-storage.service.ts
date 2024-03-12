import {Injectable} from "@angular/core";
import {JwtTokenWithUser} from "../model/jwt";
import {Constant} from "./constant";
import {jwtDecode} from "jwt-decode"
import {SecureStorageService} from "./secure-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private secureStorageService: SecureStorageService) {
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
    this.isLoggedIn = true;
    this.setHashedToLocalStorage(Constant.LS_IS_ADMIN, jwt.user.isAdmin);
  }

  getJwtToken(): string | null {
    return localStorage.getItem(Constant.LS_JWT_NAME);
  }

  removeJwtToken(): void {
    localStorage.removeItem(Constant.LS_JWT_NAME);
    this.isLoggedIn = false;
    this.removeHashedFromLocalStorage(Constant.LS_IS_ADMIN);
  }

  isUserLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  isUserAdmin(): boolean {
    return this.isAdmin;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getDeHashedToLocalStorage(key: string) {
    return this.secureStorageService.secureStorage.getItem(key);
  }

  setHashedToLocalStorage(key: string, value: any) {
    this.secureStorageService.secureStorage.setItem(key, value);
  }

  removeHashedFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
}
