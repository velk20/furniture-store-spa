import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FurnitureService} from "../../services/furniture.service";
import {Furniture} from "../../model/furniture";
import {LocalStorageService} from "../../services/local-storage.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit{
  item: Furniture = {} as Furniture;
  constructor(private activatedRoute:ActivatedRoute,
              private furnitureService:FurnitureService,
              private localStorageService:LocalStorageService,
              private userService:UserService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      const itemId = params['id'];
      this.furnitureService.getOne(itemId).subscribe(item=>{
        this.item = item;
      })
    })
    }


  deleteItem(id: number) {
    alert("Are you sure you want to delete this item?")
  }

  isOwnerOrAdmin():boolean {
    let userId = this.localStorageService.getCurrentUserIdFromJwt();
    if (userId){
      return (this.item.userId === userId);
    }else {
      return false;
    }
  }
}
