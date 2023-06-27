/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderItem } from "./order-item";

export class Order {
  _id? : string;
  orderItems?: OrderItem[];
  shippingAddress1? : string;
  shippingAddress2? : string;
  city? : string;
  zip? : string;
  country? : string;
  phone? : string;
  status? : any;
  totalPrice? : any;
  user?: any;
  dateOrdered? : string;

}
