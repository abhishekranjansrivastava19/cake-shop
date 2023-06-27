/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { CartItem, CartServiceService } from '@bluebits/orders'
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bluebits-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit, OnDestroy{
  product!: Product
  endsubs$: Subject<any> = new Subject();
  quantity?: 1

  constructor (private prodService: ProductsService, private route: ActivatedRoute, private cartService: CartServiceService) { }
  ngOnInit(): void {
      this.route.params.subscribe(params => {
        if(params['productId']){
          this._getProduct(params['productId'])
        }
      })
  }

  ngOnDestroy(): void {
      // this.endsubs$.next();
      this.endsubs$.complete()
  }

  private _getProduct(id: string){
    this.prodService.getProduct(id).pipe(takeUntil(this.endsubs$)).subscribe((resProduct)=>{
      this.product = resProduct
    })
  }

  AddtoCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem)
  }
}
