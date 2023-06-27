/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('categories', categoriesFilter.join(','))
    }
    return this.http.get<Product[]>('http://localhost:3000/api/v1/products', {params: params});
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(
      'http://localhost:3000/api/v1/products',
      productData
    );
  }

  UpdateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(
      `http://localhost:3000/api/v1/products/${productid}`,
      productData
    );
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(
      `http://localhost:3000/api/v1/products/${productId}`
    );
  }

  deleteProduct(productId: string): Observable<Object> {
    return this.http.delete<Object>(
      `http://localhost:3000/api/v1/products/${productId}`
    );
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:3000/api/v1/products/get/count`)
      .pipe(map((ObjectValue: any) => ObjectValue.productCount));
  }

  getFeaturedProduct(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:3000/api/v1/products/get/featured/${count}`
    );
  }
}
