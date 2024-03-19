import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LocalStorageService} from "../services/local-storage.service";
import {ToastrService} from "ngx-toastr";

export const loggedInGuard: CanActivateFn = (route, state) => {
  let isLogged = inject(LocalStorageService).isUserLoggedIn();
  if (isLogged) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    inject(ToastrService).error('You need to login for that page!')
  }
  return false;
};
export const profileAuthorGuard: CanActivateFn = (route, state) => {
  let profileIdParam = route.params?.['id'];
  let isLogged = inject(LocalStorageService).isUserLoggedIn();
  if (isLogged) {
    if (inject(LocalStorageService).getCurrentUserIdFromJwt() == profileIdParam) {
      return true
    }
    inject(Router).navigate(['/']);
    inject(ToastrService).error('You are not the owner of this!')
    return false;
  } else {
    inject(Router).navigate(['/login']);
    inject(ToastrService).error('You need to login for that page!')
  }
  return false;
};
