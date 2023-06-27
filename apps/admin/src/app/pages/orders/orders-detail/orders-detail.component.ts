/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem, OrdersService} from '@bluebits/orders';
import { ORDER_STATUS } from '../order-constants';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bluebits-orders-detail',
  templateUrl: './orders-detail.component.html',
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  endsubs$: Subject<any> = new Subject();
  orderItems: OrderItem;
  order: Order;
  selectedStatus: any;
  orderStatuses = [];

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy() {
    this.endsubs$.complete();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
    // console.log(this.orderStatuses)
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params._id) {
        this.orderService
          .getOrder(params._id)
          .pipe(takeUntil(this.endsubs$))
          .subscribe((order) => {
            this.order = order;
            // const orderItem = order.orderItems
            console.log(order.orderItems)
            console.log(order)
          });
      }
    });
  }

  onStatusChange(event: any) {
    this.orderService
      .UpdateOrders({ status: event.value }, this.order._id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: `Order is updated`,
        });
      });
  }
}
