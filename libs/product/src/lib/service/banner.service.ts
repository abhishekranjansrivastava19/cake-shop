/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Banner } from '../models/banner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class bannerService {

  constructor(private http: HttpClient) { }

  getBanners(): Observable<Banner[]>{
    return this.http.get<Banner[]>('http://localhost:3000/api/v1/banners')
  }

  createBanner(banner: Banner): Observable<Banner>{
    return this.http.post<Banner>('http://localhost:3000/api/v1/banners', banner)
  }

  UpdateBanner(banner: Banner): Observable<Banner>{
    return this.http.put<Banner>(`http://localhost:3000/api/v1/banners/${banner._id}`, banner)
  }

  getBanner(bannerId: string): Observable<Banner>{
    return this.http.get<Banner>(`http://localhost:3000/api/v1/banners/${bannerId}`)
  }

  deleteBanner(bannerId: string): Observable<Object>{
    return this.http.delete<Object>(`http://localhost:3000/api/v1/banners/${bannerId}`)
  }
}
