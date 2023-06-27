/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartServiceService } from '../../service/cart-service.service';
import { CartItemDetailed, OrdersService } from '@bluebits/orders';
import { Product } from '@bluebits/product';

@Component({
  selector: 'bluebits-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetailed[] = [];
  product: Product[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private cartService: CartServiceService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    // this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items?.length ?? 0;
      respCart.items?.forEach((cartItem) => {
        this.ordersService
          .getProduct(cartItem.productId)
          .subscribe((resProduct) => {
            this.cartItemsDetailed.push({
              product: resProduct,
              quantity: cartItem.quantity,
            });
          });
      });
    });
  }

  backToShop() {
    this.router.navigate(['/product-list']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  // deleteCartItem(cartItem: CartItemDetailed) {
  //   this.cartService.deleteCartItem(cartItem.product._id);
  // }

  updateCartItemQuantity(event: { value: any }, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem?.product?.id,
        quantity: event.value,
      },
      true
    );
  }
}


