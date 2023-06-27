/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
// import { OrdersService } from '@bluebits/orders';
// import { ProductsService, UsersService } from '@bluebits/product';
// import { combineLatest } from 'rxjs';

@Component({
  selector: 'bluebits-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  // statistics = [];
  constructor(
    // private userService: UsersService,
    // private productService: ProductsService,
    // private ordersService: OrdersService
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  ngOnInit(): void {
  //   combineLatest([
  //     this.ordersService.getOrdersCount(),
  //     this.productService.getProductsCount(),
  //     this.userService.getUsersCount(),
  //     this.ordersService.getTotalSales()
  //   ]).subscribe((values) => {
  //     this.statistics = values;
  //   });
  }
}
