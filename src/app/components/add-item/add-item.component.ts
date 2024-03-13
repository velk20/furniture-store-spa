import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CreateFurniture} from '../../model/furniture';
import {LocalStorageService} from '../../services/local-storage.service';
import {FurnitureService} from '../../services/furniture.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../model/category';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  categories: Category[] = [];
  addItemForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    imageUrl: ['', [Validators.required]],
    price: [0, [Validators.required]],
    quantity: [0, Validators.required],
    description: ['', Validators.required],
    categoryId: [0, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private furnitureService: FurnitureService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private router: Router,
  ) {
  }

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
    this.furnitureService.create(newItem).subscribe(res => {
      this.toastrService.success("Furniture was created!")
    }, error => {
      this.toastrService.error("Furniture was not created!")
    });
    this.router.navigate(['/dashboard']);
  }
}
