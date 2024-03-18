import {Component, OnInit} from '@angular/core';
import {FurnitureService} from '../../services/furniture.service';
import {Furniture} from '../../model/furniture';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  items: Furniture[] = [];
  start: number = 0;
  end: number = 8;
  hasMoreItems: boolean = true;

  constructor(
    private furnitureService: FurnitureService,
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    this.furnitureService.getAll('0', '8').subscribe((items) => {
      this.items = items;
    });
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.getJwtToken();
  }

  isAdmin() {
    return this.localStorageService.isUserAdmin();
  }

  nextPage() {
    const newStart = this.end;
    const newEnd = newStart + 8;
    this.furnitureService.getAll(newStart.toString(), newEnd.toString()).subscribe(items => {
      this.hasMoreItems = items.length >= 8;
      this.items = items;
      this.start = newStart;
      this.end = newEnd;
    });
  }

  prevPage() {
    if (this.start === 0) {
      return
    }
    const newStart = this.start - 8;
    const newEnd = this.end - 8;
    this.furnitureService.getAll(newStart.toString(), newEnd.toString()).subscribe(items => {
      this.hasMoreItems = true
      this.items = items;
      this.start = newStart;
      this.end = newEnd;
    })
  }
}
