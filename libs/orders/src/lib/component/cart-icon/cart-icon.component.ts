import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../service/cart-service.service';

@Component({
  selector: 'bluebits-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {
  cartCount = 0
  constructor (private cartService: CartServiceService) { }
  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart =>{
      this.cartCount = cart?.items?.length ?? 0;
    })
  }
}
