/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

// const TOKEN = 'jwtToken'

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {


  constructor() { }

  setToken(data: any){
    localStorage.setItem('token', data)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token')
  }

  isValidToken(){
    const token = this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp)
    } else {
      return false;
    }
  }

  getUserIdFromToken(){
    const token = this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode){
        return tokenDecode.userId
      } else {
        return null;
      }
    } else {
      return null;
    }
  }


  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >=expiration;
  }
}
