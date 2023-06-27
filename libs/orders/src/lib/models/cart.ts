/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "./product";

export class Cart {
  items?: CartItem[];
}

export class CartItem {
  productId?: any;
  quantity?: any;
}

export class CartItemDetailed {
  product?: Product;
  quantity?: any;
}
