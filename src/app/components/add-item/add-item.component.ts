import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CreateFurniture} from "../../model/furniture";
import {LocalStorageService} from "../../services/local-storage.service";
import {User} from "../../model/user";
import {FurnitureService} from "../../services/furniture.service";
import { Router} from "@angular/router";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  constructor(private formBuilder:FormBuilder,
              private furnitureService: FurnitureService,
              private localStorageService: LocalStorageService,
              private userService:UserService,
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
    const userId: number = this.localStorageService.getCurrentUserIdFromJwt() || 0;

      const newItem: CreateFurniture = {
        title: this.addItemForm.value.title || '',
        imageUrl: this.addItemForm.value.imageUrl || '',
        price: this.addItemForm.value.price || 0,
        quantity: this.addItemForm.value.quantity || 0,
        description: this.addItemForm.value.description || '',
        isActive: true,
        userId: userId,
      }

      debugger
      this.furnitureService.create(newItem).subscribe(item=>{
        console.log(item);
      });
      this.router.navigate(['/dashboard'])
  }
}