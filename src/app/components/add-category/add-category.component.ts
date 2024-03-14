import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateCategory } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  addCategoryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  onSubmit() {
    this.categoryService
      .create(this.addCategoryForm.value as CreateCategory)
      .subscribe(
        (cat) => {
          this.toastrService.success('Category was created!');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.toastrService.error('Error while creating category!');
        }
      );
  }
}
