import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureService } from '../../services/furniture.service';
import { Furniture } from '../../model/furniture';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';
import { UpdateLikedItems, User } from '../../model/user';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  category: Category = {} as Category;
  item: Furniture = {} as Furniture;
  currentUser: User = {} as User;
  seller: User = {} as User;
  isUserAlreadyLiked: boolean = false;

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private furnitureService: FurnitureService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const itemId = params['id'];
      this.furnitureService.getOne(itemId).subscribe((item) => {
        this.item = item;
        this.userService.getOne(item.userId).subscribe((user) => {
          this.seller = user;
          this.categoryService
            .getOne(this.item.categoryId)
            .subscribe((category) => {
              this.category = category;
              let userId = this.localStorageService.getCurrentUserIdFromJwt();
              if (userId) {
                this.userService.getOne(userId).subscribe((user) => {
                  this.currentUser = user;
                  let find = user.likedItems.find((i) => i === this.item.id);
                  this.isUserAlreadyLiked = !!find;
                });
              }
            });
        });
      });
    });
  }

  deleteItem(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.furnitureService.delete(id).subscribe(() => {
          this.userService
            .getAllWhereFurnitureIsLiked(id)
            .subscribe((users) => {
              users.forEach((user) => {
                let index = user.likedItems.indexOf(id);
                user.likedItems.splice(index, 1);
                const updatedUser: UpdateLikedItems = {
                  likedItems: user.likedItems,
                };
                this.userService
                  .update(user.id, updatedUser)
                  .subscribe((user: User) => {});
              });
            });
          this.toastrService.success('Your deletion was successfully!');
          this.router.navigate(['/dashboard']);
        });
      }
    });
  }

  isLoggedIn() {
    return !!this.localStorageService.getJwtToken();
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
    debugger;
    let likedItems = this.currentUser.likedItems;
    likedItems.push(itemId);
    this.currentUser.likedItems = likedItems;

    // @ts-ignore
    delete this.currentUser.password;

    this.userService
      .update(this.currentUser.id, this.currentUser)
      .subscribe((user) => {
        this.currentUser = user;
        this.isUserAlreadyLiked = true;
        this.toastrService.success('Furniture was added to your likes!');
      });
  }

  removeLikeItem(itemId: number) {
    let likedItems = this.currentUser.likedItems;
    likedItems = likedItems.filter((id) => id !== itemId);
    this.currentUser.likedItems = likedItems;

    // @ts-ignore
    delete this.currentUser.password;

    this.userService
      .update(this.currentUser.id, this.currentUser)
      .subscribe((user) => {
        this.isUserAlreadyLiked = false;
        this.toastrService.success('Furniture was removed from your likes!');
      });
  }

  backButton() {
    this._location.back();
  }
}
