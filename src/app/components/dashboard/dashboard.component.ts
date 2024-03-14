import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../../services/furniture.service';
import { Furniture } from '../../model/furniture';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  items: Furniture[] = [];

  constructor(
    private furnitureService: FurnitureService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.furnitureService.getAll().subscribe((items) => {
      this.items = items;
    });
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.getJwtToken();
  }
}
