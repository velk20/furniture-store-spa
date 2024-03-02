import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Constant} from "./constant";
import {Observable} from "rxjs";
import {Furniture} from "../model/furniture";

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  furnitureUrl = Constant.BASE_URL + '/furniture';

  constructor(private http: HttpClient) {
  }

  getOne(id: number): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.furnitureUrl}/${id}`);
  }

  getAll(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`${this.furnitureUrl}`);
  }
}
