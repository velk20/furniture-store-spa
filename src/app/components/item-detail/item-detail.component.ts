import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureService } from '../../services/furniture.service';
import { Furniture } from '../../model/furniture';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  item: Furniture = {} as Furniture;

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
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.furnitureService.delete(id).subscribe(() => {
        alert('You successfully delete this item!');
        this.router.navigate(['/dashboard']);
      });
    }
  }

  isOwnerOrAdmin(): boolean {
    let userId = this.localStorageService.getCurrentUserIdFromJwt();
    if (userId) {
      return this.item.userId === userId;
    } else {
      return false;
    }
  }
}
