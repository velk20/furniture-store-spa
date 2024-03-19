import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {Furniture} from "../../model/furniture";
import {FurnitureService} from "../../services/furniture.service";

@Component({
  selector: 'app-my-uploads',
  templateUrl: './my-uploads.component.html',
  styleUrls: ['./my-uploads.component.css']
})
export class MyUploadsComponent implements OnInit {
  items: Furniture[] = []

  constructor(private localStorageService: LocalStorageService,
              private furnitureService: FurnitureService) {

  }

  ngOnInit(): void {
    let userId = this.localStorageService.getCurrentUserIdFromJwt();
    if (userId) {
      this.furnitureService.getAllByUserId(userId).subscribe(items => this.items = items)
    }
  }

  isLoggedIn() {
    return this.localStorageService.isUserLoggedIn();
  }
}
