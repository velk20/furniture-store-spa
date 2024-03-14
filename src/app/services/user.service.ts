import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserLogin, UserRegister, UserUpdate } from '../model/user';
import { Constant } from './constant';
import { JwtTokenWithUser } from '../model/jwt';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = Constant.BASE_URL + '/users';

  constructor(private http: HttpClient) {}

  register(user: UserRegister): Observable<JwtTokenWithUser> {
    return this.http.post<JwtTokenWithUser>(
      Constant.BASE_URL + '/register',
      user
    );
  }

  login(user: UserLogin): Observable<JwtTokenWithUser> {
    return this.http.post<JwtTokenWithUser>(Constant.BASE_URL + '/login', user);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }

  getOne(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  update(id: number, user: UserUpdate): Observable<User> {
    return this.http.patch<User>(`${this.userUrl}/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.userUrl}/${id}`);
  }

  isUserAdmin(id: number): Observable<boolean> {
    const result = new Subject<boolean>();

    this.getOne(id).subscribe(
      (user) => {
        result.next(user.isAdmin);
        result.complete();
      },
      (error) => {
        result.next(false);
        result.complete();
      }
    );

    return result.asObservable();
  }

  getByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}?email like=${email}`);
  }
}
