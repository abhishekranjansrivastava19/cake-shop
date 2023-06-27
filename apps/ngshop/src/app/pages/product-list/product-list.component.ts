/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
} from '@bluebits/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bluebits-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  endsubs$: Subject<any> = new Subject();

  product: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      params.categoryId ? this._getProducts([params.categoryId]) : this._getProducts();
      params.categoryId ? (this.isCategoryPage = true) : (this.isCategoryPage = false)
    })
    this._getCategories();
  }
  ngOnDestroy(): void {
    this.endsubs$.complete();
  }
  private _getProducts(categoriesFilter? : string[]) {
    this.prodService
      .getProducts(categoriesFilter)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((product) => {
        this.product = product;
      });
  }

  private _getCategories() {
    this.catService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((cats) => {
        this.categories = cats;
      });
  }

  filterCategory() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category._id);

      this._getProducts(selectedCategories)
  }
}
