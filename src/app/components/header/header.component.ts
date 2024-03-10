import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  isLoggedIn():boolean{
    return this.localStorageService.isUserLoggedIn();
  }
  logout() {
    this.localStorageService.removeJwtToken();
    this.router.navigate(['/']);
  }

  navigateToProfilePage() {
    let idFromJwt: number | null = this.localStorageService.getCurrentUserIdFromJwt();
    if (idFromJwt) {
      this.router.navigate([`/profile/${idFromJwt}`]);
    }else {
      this.router.navigate(['/']);
    }
  }
}
