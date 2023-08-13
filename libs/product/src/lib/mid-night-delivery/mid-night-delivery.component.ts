import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'bluebits-mid-night-delivery',
  templateUrl: './mid-night-delivery.component.html',
})
export class MidNightDeliveryComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor (private prodService: ProductsService) { }

  ngOnInit(): void {
      this._getMidNightDeliveryProduct()
  }

  ngOnDestroy(): void {
      this.endsubs$.complete()
  }

  private _getMidNightDeliveryProduct() {
    this.prodService.getMidNightDeliveryProduct(4).pipe(takeUntil(this.endsubs$)).subscribe((midNight)=>{
      this.products = midNight
    })
  }

}
