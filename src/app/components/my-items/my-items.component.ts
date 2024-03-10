import { Component, OnInit } from '@angular/core';
import { Furniture } from '../../model/furniture';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { FurnitureService } from '../../services/furniture.service';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css'],
})
export class MyItemsComponent implements OnInit {
  items: Furniture[] = [];

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private furnitureService: FurnitureService,
  ) {}

  ngOnInit(): void {
    let userId = this.localStorageService.getCurrentUserIdFromJwt();
    if (userId) {
      this.userService.getOne(userId).subscribe((user) => {
        let likedItems: number[] = user.likedItems;
        for (const likedItem of likedItems) {
          this.furnitureService.getOne(likedItem).subscribe((item) => {
            this.items.push(item);
          });
        }
      });
    }
  }
}
