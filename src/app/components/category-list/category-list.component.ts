import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { LocalStorageService } from '../../services/local-storage.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((c) => {
      this.categories = c;
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete this category?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id).subscribe(() => {
          this.toastrService.success(
            'Deletion of this category was successfully!',
          );
        });
        this.categories = this.categories.filter((ca) => ca.id !== id);
        this.router.navigate(['/category']);
      }
    });
  }

  isAdmin() {
    return this.localStorageService.isUserAdmin();
  }

  isLoggedIn() {
    return !!this.localStorageService.getJwtToken();
  }
}
