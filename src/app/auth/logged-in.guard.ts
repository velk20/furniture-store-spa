import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {LocalStorageService} from "../services/local-storage.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
  return inject(LocalStorageService).isUserLoggedIn();
};
