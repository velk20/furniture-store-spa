import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CreateFurniture} from "../../model/furniture";
import {LocalStorageService} from "../../services/local-storage.service";
import {User} from "../../model/user";
import {FurnitureService} from "../../services/furniture.service";
import { Router} from "@angular/router";


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  constructor(private formBuilder:FormBuilder,
              private furnitureService: FurnitureService,
              private localStorageService: LocalStorageService,
              private router:Router) {
  }
  addItemForm = this.formBuilder.group({
    title: [''],
    imageUrl: [''],
    price: [0],
    quantity: [0],
    description: [''],
  })

  onSubmit() {
    debugger;
    let currentUser = this.localStorageService.getCurrentUser() || {} as User;
      const newItem: CreateFurniture = {
        title: this.addItemForm.value.title || '',
        imageUrl: this.addItemForm.value.imageUrl || '',
        price: this.addItemForm.value.price || 0,
        quantity: this.addItemForm.value.quantity || 0,
        description: this.addItemForm.value.description || '',
        isActive: true,
        user: currentUser,
      }

      debugger
      this.furnitureService.create(newItem);
      this.router.navigate(['/dashboard'])
  }
}
