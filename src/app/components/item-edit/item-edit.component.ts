import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FurnitureService } from '../../services/furniture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Furniture } from '../../model/furniture';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
})
export class ItemEditComponent implements OnInit {
  item: Furniture = {} as Furniture;
  editItemForm = this.formBuilder.group({
    title: [''],
    imageUrl: [''],
    price: [0],
    quantity: [0],
    description: [''],
    userId: [this.item.userId],
    id: [this.item.id],
    isActive: [this.item.isActive],
  });

  constructor(
    private formBuilder: FormBuilder,
    private furnitureService: FurnitureService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let itemId = params['id'];
      this.furnitureService.getOne(itemId).subscribe((item) => {
        this.editItemForm.setValue(item);
        this.item = item;
      });
    });
  }

  onSubmit() {
    const editedItem: Furniture = {
      title: this.editItemForm.value.title || this.item.title,
      imageUrl: this.editItemForm.value.imageUrl || this.item.imageUrl,
      price: this.editItemForm.value.price || this.item.price,
      quantity: this.editItemForm.value.quantity || this.item.quantity,
      description: this.editItemForm.value.description || this.item.description,
      userId: this.item.userId,
      id: this.item.id,
      isActive: this.item.isActive,
    };

    this.furnitureService
      .update(editedItem.id, editedItem)
      .subscribe((newItem) => {
        this.item = newItem;
      });

    this.router.navigate(['/dashboard']);
  }
}
