/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Product, ProductsService } from '@bluebits/product';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bluebits-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  endsubs$: Subject<any> = new Subject();
  editmode = false;
  form: FormGroup;
  isSubmitted: boolean = false;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  imagesDisplay: string[] | ArrayBuffer;
  currentProductId: string;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  ngOnDestroy(){
    this.endsubs$.complete();
}

  private _initForm() {
    this.form = this.formBuilder.group({
      id: this.currentProductId,
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
      midNightDelivery: [false],
    });
  }

  private _updateProduct(productFormData: FormData) {
    this.productService
      .UpdateProduct(productFormData, this.currentProductId).pipe(takeUntil(this.endsubs$))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: `Product is Updated`,
        });
      });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params._id) {
        this.currentProductId = params._id;
        this.editmode = true;
        this.productService.getProduct(params._id).pipe(takeUntil(this.endsubs$)).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.category.setValue(product.category);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.midNightDelivery.setValue(product.midNightDelivery);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();

        });
      }
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _addProduct(productData: FormData) {
    this.productService
      .createProduct(productData).pipe(takeUntil(this.endsubs$))
      .subscribe((product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: `Product ${product.name} is created`,
        });
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
    // productFormData.append()
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  get productForm() {
    return this.form.controls;
  }
}
