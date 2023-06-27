/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartServiceService, Order, OrderItem, OrdersService } from '@bluebits/orders';
import { UsersService } from '@bluebits/product';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'bluebits-checkout',
  templateUrl: './checkout.component.html',
  styles: [],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartServiceService,
    private ordersService: OrdersService,
  ) {}
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string | undefined;
  countries = [];
  unsubscribe$ : Subject<any> = new Subject();
  // orderStatus = ORDER_STATUS;

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFilledUserData();
    this._getCartItems();
    this._getCountries();
  }

  ngOnDestroy() {
    // this.unsubscribe$.next;
    this.unsubscribe$.complete()
  };


  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _autoFilledUserData () {
    this.usersService.ObserveCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe((user)=>{
      if(user){
        this.userId = user.id;
        this.checkoutForm['name'].setValue(user.name);
        this.checkoutForm['email'].setValue(user.email);
        this.checkoutForm['phone'].setValue(user.phone);
        this.checkoutForm['city'].setValue(user.city);
        this.checkoutForm['country'].setValue(user.country);
        this.checkoutForm['zip'].setValue(user.zip);
        this.checkoutForm['apartment'].setValue(user.apartment);
        this.checkoutForm['street'].setValue(user.street);

      }
    })
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart-page']);
  }

  placeOrder() {
    this.isSubmitted = true;
    // if (this.checkoutFormGroup.invalid) {
    //   return;
    // }



    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.cacheOrderData(order);


    this.ordersService.createCheckoutSession(this.orderItems).subscribe((error)=>{
      if(error){
        console.log('Error in redirecting to paytment')
      }
    })


  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
