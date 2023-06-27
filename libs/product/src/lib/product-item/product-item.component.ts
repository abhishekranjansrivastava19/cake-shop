import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { CartItem, CartServiceService } from '@bluebits/orders';

@Component({
  selector: 'bluebits-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {

  constructor(private cartService: CartServiceService) { }
  @Input() product!: Product;

  AddtoCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }
}
