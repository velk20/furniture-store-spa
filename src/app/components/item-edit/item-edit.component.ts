import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FurnitureService} from '../../services/furniture.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Furniture} from '../../model/furniture';
import {Category} from '../../model/category';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
})
export class ItemEditComponent implements OnInit {
  item: Furniture = {} as Furniture;
  categories: Category[] = [];

  editItemForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    imageUrl: ['', [Validators.required]],
    price: [0, [Validators.required]],
    quantity: [0, [Validators.required]],
    description: ['', [Validators.required]],
    userId: [this.item.userId],
    id: [this.item.id],
    isActive: [this.item.isActive],
    categoryId: [this.item.categoryId, [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private furnitureService: FurnitureService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let itemId = params['id'];
      this.furnitureService.getOne(itemId).subscribe((item) => {
        this.editItemForm.setValue(item);
        this.item = item;
        this.categoryService.getAll().subscribe((c) => {
          this.categories = c;
        });
      });
    });


  }

  onSubmit() {
    console.log(this.item.categoryId);
    console.log(this.categories);

    return;
    const editedItem: Furniture = {
      title: this.editItemForm.value.title || this.item.title,
      imageUrl: this.editItemForm.value.imageUrl || this.item.imageUrl,
      price: this.editItemForm.value.price || this.item.price,
      quantity: this.editItemForm.value.quantity || this.item.quantity,
      description: this.editItemForm.value.description || this.item.description,
      userId: this.item.userId,
      id: this.item.id,
      isActive: this.item.isActive,
      categoryId:
        Number(this.editItemForm.value.categoryId) || this.item.categoryId,
    };

    this.furnitureService
      .update(editedItem.id, editedItem)
      .subscribe(res => {
        this.item = res;
        this.toastrService.success('Furniture updated successfully!')
      }, error => {
        this.toastrService.error("Edit on furniture ends with error!")
      });

    this.router.navigate(['/dashboard']);
  }
}
