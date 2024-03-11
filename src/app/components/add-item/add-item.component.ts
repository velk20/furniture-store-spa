import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateFurniture } from '../../model/furniture';
import { LocalStorageService } from '../../services/local-storage.service';
import { FurnitureService } from '../../services/furniture.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  categories: Category[] = [];
  addItemForm = this.formBuilder.group({
    title: [''],
    imageUrl: [''],
    price: [0],
    quantity: [0],
    description: [''],
    categoryId: [0],
  });

  constructor(
    private formBuilder: FormBuilder,
    private furnitureService: FurnitureService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((items) => {
      this.categories = items;
    });
  }

  onSubmit() {
    debugger;
    const userId: number =
      this.localStorageService.getCurrentUserIdFromJwt() || 0;

    const newItem: CreateFurniture = {
      title: this.addItemForm.value.title || '',
      imageUrl: this.addItemForm.value.imageUrl || '',
      price: this.addItemForm.value.price || 0,
      quantity: this.addItemForm.value.quantity || 0,
      description: this.addItemForm.value.description || '',
      isActive: true,
      userId: userId,
      categoryId: Number(this.addItemForm.value.categoryId) || 0,
    };

    debugger;
    this.furnitureService.create(newItem).subscribe((item) => {
      console.log(item);
    });
    this.router.navigate(['/dashboard']);
  }
}
