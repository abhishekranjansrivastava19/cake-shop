/* eslint-disable @typescript-eslint/no-explicit-any */
export class Product {
  id? : string;
  name? : string;
  description? : string;
  richDescription? : string;
  image? : string;
  images? : string[];
  brand? : string;
  price? : any;
  category? : string;
  countInStock? : number;
  rating? : number;
  numReviews? : number;
  isFeatured? : boolean;
  dateCreated? : string;
}
