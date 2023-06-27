/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient, private stripeService: StripeService) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/api/v1/orders');
  }

  createOrders(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/api/v1/orders', order);
  }

  UpdateOrders(
    orderStatus: { status: string },
    orderId: string
  ): Observable<Order> {
    return this.http.put<Order>(
      `http://localhost:3000/api/v1/orders/${orderId}`,
      orderStatus
    );
  }

  getOrder(OrderId: string): Observable<Order> {
    return this.http.get<Order>(
      `http://localhost:3000/api/v1/orders/${OrderId}`
    );
  }

  deleteOrder(OrderId: string): Observable<Object> {
    return this.http.delete<Object>(
      `http://localhost:3000/api/v1/orders/${OrderId}`
    );
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(
      `http://localhost:3000/api/v1/products/${productId}`
    );
  }

  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http
      .post(`http://localhost:3000/api/v1/orders/checkout-session`, orderItem)
      .pipe(
        switchMap((session: {id: string}) => {
          return this.stripeService.redirectToCheckout({
            sessionId: session.id,
          });
        })
      );
  }


  cacheOrderData(order: Order) {
     localStorage.setItem('orderData', JSON.stringify(order))
  }


  getChachedOrderData() : Order {
    return JSON.parse(localStorage.getItem('orderData'));
  }

  removedChachedOrderData() {
    localStorage.removeItem('orderData');
  }
}
