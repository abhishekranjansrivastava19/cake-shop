/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authguard {

  constructor(private localstorageService: LocalstorageService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.localstorageService.getToken();
      if(token){
        const tokenDecode = JSON.parse(atob(token.split('.')[1]))
        if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
          return true
        }
      }
      this.router.navigate(['/login'])
      return false
  }

  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >=expiration;
  }
}
