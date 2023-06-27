/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bluebits-featured-product',
  templateUrl: './featured-product.component.html',
})
export class FeaturedProductComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor (private prodService: ProductsService) { }

  ngOnInit(): void {
      this._getFeaturedProduct()
  }

  ngOnDestroy(): void {
      this.endsubs$.complete()
  }

  private _getFeaturedProduct() {
    this.prodService.getFeaturedProduct(4).pipe(takeUntil(this.endsubs$)).subscribe((featured)=>{
      this.products = featured
    })
  }

}
