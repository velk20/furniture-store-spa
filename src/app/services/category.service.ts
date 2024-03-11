import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constant } from './constant';
import { Observable } from 'rxjs';
import { Category, CreateCategory } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryUrl = Constant.BASE_URL + '/category';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoryUrl}/${id}`);
  }

  create(category: CreateCategory): Observable<Category> {
    return this.http.post<Category>(`${this.categoryUrl}`, category);
  }

  update(id: number, category: CreateCategory): Observable<Category> {
    return this.http.put<Category>(`${this.categoryUrl}/${id}`, category);
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.categoryUrl}/${id}`);
  }
}
