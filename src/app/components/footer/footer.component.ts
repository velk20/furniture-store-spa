import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Furniture } from 'src/app/model/furniture';
import { CategoryService } from 'src/app/services/category.service';
import { FurnitureService } from 'src/app/services/furniture.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  items: Furniture[] = [];
  categories: Category[] = [];
  constructor(
    private categoryService: CategoryService,
    private furnitureService: FurnitureService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((items) => {
      this.categories = items.slice(-3);

      this.furnitureService.getAll().subscribe((fur) => {
        this.items = fur.slice(-3);
      });
    });
  }
}
