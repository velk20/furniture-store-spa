import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LocalStorageService} from "../services/local-storage.service";
import {ToastrService} from "ngx-toastr";

export const adminGuard: CanActivateFn = (route, state): boolean => {
  let isAdmin: boolean = inject(LocalStorageService).isUserAdmin();
  if (isAdmin) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    inject(ToastrService).error('You need admin permissions for that page!')
  }
  return false;
};
