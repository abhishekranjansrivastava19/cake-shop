/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/product';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'bluebits-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  endsubs$: Subject<any> = new Subject();
  form: FormGroup;

  isSubmitted: boolean = false;

  editmode = false;

  currentCategoryId: string;

  constructor(
    private messageService: MessageService,
    private formbuilder: FormBuilder,
    private categoriesSercice: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff', Validators.required]
    });

    this._checkEditMode();
  }

  ngOnDestroy(){
      this.endsubs$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      _id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };
    if (this.editmode) {
      this._UpdateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  private _UpdateCategory(category: Category) {
    this.categoriesSercice.UpdateCategory(category).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Category is Updated',
      });
    });
  }

  private _addCategory(category: Category) {
    this.categoriesSercice.createCategory(category).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: `Category ${category.name} is created`,
      });
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params._id) {
        this.currentCategoryId = params._id;
        this.editmode = true;
        this.categoriesSercice.getCategory(params._id).pipe(takeUntil(this.endsubs$)).subscribe((category) => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        });
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }
}
