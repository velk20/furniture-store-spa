import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureService } from '../../services/furniture.service';
import { Furniture } from '../../model/furniture';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  item: Furniture = {} as Furniture;
  currentUser: User = {} as User;
  isUserAlreadyLiked: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private furnitureService: FurnitureService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const itemId = params['id'];
      this.furnitureService.getOne(itemId).subscribe((item) => {
        this.item = item;
      });
    });

    let userId = this.localStorageService.getCurrentUserIdFromJwt();
    if (userId) {
      this.userService.getOne(userId).subscribe((user) => {
        this.currentUser = user;
        let find = user.likedItems.find((i) => i === this.item.id);
        this.isUserAlreadyLiked = !!find;
      });
    }
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.furnitureService.delete(id).subscribe(() => {
        alert('You successfully delete this item!');
        this.router.navigate(['/dashboard']);
      });
    }
  }

  isOwner(): boolean {
    let userId = this.localStorageService.getCurrentUserIdFromJwt();
    if (userId) {
      return this.item.userId === userId;
    } else {
      return false;
    }
  }

  likeItem(itemId: number) {
    let likedItems = this.currentUser.likedItems;
    likedItems.push(itemId);
    this.currentUser.likedItems = likedItems;

    this.userService
      .update(this.currentUser.id, this.currentUser)
      .subscribe((user) => {
        this.router.navigate(['/my-likes']);
      });
  }

  removeLikeItem(itemId: number) {
    let likedItems = this.currentUser.likedItems;
    likedItems = likedItems.filter((id) => id !== itemId);
    this.currentUser.likedItems = likedItems;

    this.userService
      .update(this.currentUser.id, this.currentUser)
      .subscribe((user) => {
        this.router.navigate(['/my-likes']);
      });
  }
}
