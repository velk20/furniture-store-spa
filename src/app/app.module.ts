import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgOptimizedImage} from "@angular/common";
import {RegisterComponent} from './components/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MyInterceptor} from "./auth/jwt-interceptor";
import {HeaderComponent} from "./components/header/header.component";
import {HomeComponent} from "./components/home/home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {FooterComponent} from "./components/footer/footer.component";
import {LoginComponent} from "./components/login/login.component";
import {ErrorComponent} from './components/error/error.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ItemComponent} from './components/item/item.component';
import {AddItemComponent} from "./components/add-item/add-item.component";
import {AboutComponent} from './components/about/about.component';
import {ItemDetailComponent} from './components/item-detail/item-detail.component';
import {ItemEditComponent} from './components/item-edit/item-edit.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileChangePasswordComponent} from './components/profile-change-password/profile-change-password.component';
import {MyItemsComponent} from './components/my-items/my-items.component';
import {AddCategoryComponent} from './components/add-category/add-category.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ErrorComponent,
    ItemComponent,
    AddItemComponent,
    AboutComponent,
    ItemDetailComponent,
    ItemEditComponent,
    ProfileComponent,
    ProfileChangePasswordComponent,
    MyItemsComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
