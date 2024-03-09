import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UserLogin, UserRegister, UserUpdate} from "../model/user";
import {Constant} from "./constant";
import {JwtToken} from "../model/jwt";
import {Observable} from "rxjs";
import {bodyParsingHandler} from "json-server-auth/dist/shared-middlewares";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = Constant.BASE_URL + '/users';

  constructor(private http: HttpClient) {

  }

  register(user:UserRegister): Observable<JwtToken> {
    return this.http.post<JwtToken>(Constant.BASE_URL + '/register', user);
  }

  login(user: UserLogin):Observable<JwtToken> {
    return this.http.post<JwtToken>(Constant.BASE_URL + '/login', user);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }

  getOne(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  update(id: number, user:UserUpdate): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${id}`, user);
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.userUrl}/${id}`);
  }

  getByEmail(email: string):Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}?email like=${email}`);
  }

}
