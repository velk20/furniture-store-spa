import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category, CreateCategory } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  category: Category = {} as Category;
  editCategoryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let categoryId = params['id'];
      this.categoryService.getOne(categoryId).subscribe((item) => {
        this.category = item;
        this.editCategoryForm.setValue(item);
      });
    });
  }

  onSubmit() {
    this.categoryService
      .update(this.category.id, this.editCategoryForm.value as CreateCategory)
      .subscribe((item) => {
        this.toastrService.success('Category updated!');
        this.router.navigate(['/category']);
      });
  }
}
