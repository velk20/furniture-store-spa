import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AboutComponent } from './components/about/about.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemEditComponent } from './components/item-edit/item-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileChangePasswordComponent } from './components/profile-change-password/profile-change-password.component';
import { MyItemsComponent } from './components/my-items/my-items.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'my-likes', component: MyItemsComponent },
  { path: 'add-furniture', component: AddItemComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'furniture/:id', component: ItemDetailComponent },
  { path: 'furniture/edit/:id', component: ItemEditComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/edit/:id', component: CategoryListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'change-password/:id', component: ProfileChangePasswordComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
