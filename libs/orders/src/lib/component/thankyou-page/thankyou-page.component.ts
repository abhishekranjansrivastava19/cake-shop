import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../service/orders.service';
import { CartServiceService } from '../../service/cart-service.service';

@Component({
  selector: 'bluebits-thankyou-page',
  templateUrl: './thankyou-page.component.html',
})
export class ThankyouPageComponent implements OnInit {
  constructor (private orderService: OrdersService, private cartServicer: CartServiceService) {}

  ngOnInit(): void {
    const orderData = this.orderService.getChachedOrderData();

    this.orderService.createOrders(orderData).subscribe(()=>{
      this.cartServicer.emptyCart();
      this.orderService.removedChachedOrderData();
    })
  }
}
