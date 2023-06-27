import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServiceService } from './service/cart-service.service';
import { CartIconComponent } from './component/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './component/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './component/order-summary/order-summary.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext';
import { ThankyouPageComponent } from './component/thankyou-page/thankyou-page.component';
import { Authguard } from '@bluebits/users'

const routes: Routes = [
  { path: 'cart-page', component: CartPageComponent },
  { path: 'checkout', canActivate: [Authguard], component: CheckoutComponent },
  { path: 'thankyou', component: ThankyouPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    ReactiveFormsModule,
    InputMaskModule,
    InputTextModule
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    ThankyouPageComponent,
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutComponent,
  ],
})
export class OrdersModule {
  constructor(private cartService: CartServiceService) {
    this.cartService.initCartLocalStorage();
  }
}
