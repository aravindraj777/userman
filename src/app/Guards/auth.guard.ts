import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

export const authGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  if(localStorage.getItem('token')){
    return true;
  }
  //router.navigate([""]);
  return false;
};
