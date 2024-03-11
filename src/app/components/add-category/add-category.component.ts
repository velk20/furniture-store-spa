import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateCategory } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  addCategoryForm = this.formBuilder.group({
    name: [''],
    description: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  onSubmit() {
    let newCategory: CreateCategory = {
      name: this.addCategoryForm.value.name || '',
      description: this.addCategoryForm.value.description || '',
    };

    this.categoryService.create(newCategory).subscribe((cat) => {
      this.router.navigate(['/dashboard']);
    });
  }
}
