import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constant} from './constant';
import {Observable} from 'rxjs';
import {CreateFurniture, Furniture} from '../model/furniture';

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  furnitureUrl = Constant.BASE_URL + '/furniture';

  constructor(private http: HttpClient) {
  }

  getOne(id: number): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.furnitureUrl}/${id}`);
  }

  getAll(start: string, end: string): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`${this.furnitureUrl}?_start=${start}&_end=${end}`);
  }

  create(furniture: CreateFurniture): Observable<Furniture> {
    return this.http.post<Furniture>(`${this.furnitureUrl}`, furniture);
  }

  update(id: number, furniture: Furniture): Observable<Furniture> {
    return this.http.put<Furniture>(`${this.furnitureUrl}/${id}`, furniture);
  }

  delete(id: number) {
    return this.http.delete(`${this.furnitureUrl}/${id}`);
  }
}
