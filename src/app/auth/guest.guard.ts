import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LocalStorageService} from "../services/local-storage.service";

export const guestGuard: CanActivateFn = (route, state) => {
  let isLoggedIn = inject(LocalStorageService).isUserLoggedIn();
  if (isLoggedIn) {
    inject(Router).navigate(['/']);
    return false;
  } else {
    return true
  }
};
