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
