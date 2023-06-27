/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from '@bluebits/users';

declare const require: (arg0: string) => countriesLib.LocaleData;


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private userFacade: UsersFacade) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));

  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/api/v1/users')
  }

  createUsers(user: User): Observable<User>{
    return this.http.post<User>('http://localhost:3000/api/v1/users', user)
  }

  UpdateUser(user: User): Observable<User>{
    return this.http.put<User>(`http://localhost:3000/api/v1/users/${user.id}`, user)
  }

  getUser(userId: string): Observable<User>{
    return this.http.get<User>(`http://localhost:3000/api/v1/users/${userId}`)
  }

  deleteUser(userId: string): Observable<User>{
    return this.http.delete<User>(`http://localhost:3000/api/v1/users/${userId}`)
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

  initAppSession () {
    this.userFacade.buildUserSession();
  }

  ObserveCurrentUser () {
    return this.userFacade.currentUser$
  }

  isCurrentUserAuth () {
    return this.userFacade.isAuthenticated$
  }
}
