import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';
import {AddItemComponent} from './components/add-item/add-item.component';
import {AboutComponent} from './components/about/about.component';
import {ItemDetailComponent} from './components/item-detail/item-detail.component';
import {ItemEditComponent} from './components/item-edit/item-edit.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileChangePasswordComponent} from './components/profile-change-password/profile-change-password.component';
import {MyItemsComponent} from './components/my-items/my-items.component';
import {AddCategoryComponent} from './components/add-category/add-category.component';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {CategoryEditComponent} from './components/category-edit/category-edit.component';
import {guestGuard} from "./auth/guest.guard";
import {loggedInGuard} from "./auth/logged-in.guard";
import {adminGuard} from "./auth/admin.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [guestGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [guestGuard]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'my-likes', component: MyItemsComponent, canActivate: [loggedInGuard]},
  {path: 'add-furniture', component: AddItemComponent, canActivate: [loggedInGuard]},
  {path: 'add-category', component: AddCategoryComponent, canActivate: [adminGuard]},
  {path: 'furniture/:id', component: ItemDetailComponent},
  {path: 'furniture/edit/:id', component: ItemEditComponent, canActivate: [loggedInGuard]},
  {path: 'category', component: CategoryListComponent, canActivate: [adminGuard]},
  {path: 'category/edit/:id', component: CategoryEditComponent, canActivate: [adminGuard]},
  {path: 'users', component: UserListComponent, canActivate: [adminGuard]},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [loggedInGuard]},
  {path: 'change-password/:id', component: ProfileChangePasswordComponent, canActivate: [loggedInGuard]},
  {path: 'about', component: AboutComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
