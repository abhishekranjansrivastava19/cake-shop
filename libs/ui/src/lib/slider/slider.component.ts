/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '@bluebits/product';
import { CategoriesService } from '@bluebits/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
})
export class SliderComponent implements OnInit, OnDestroy {

  endsubs$: Subject<any> = new Subject();

  categories: Category[] = [];
  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    this.endsubs$.complete();
  }
}
