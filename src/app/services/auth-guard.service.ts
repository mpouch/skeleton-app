import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  private static authenticated = false;

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!AuthGuardService.authenticated) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  static authenticate() {
    AuthGuardService.authenticated = true;
  }

  static logout() {
    AuthGuardService.authenticated = false;
  }
}
