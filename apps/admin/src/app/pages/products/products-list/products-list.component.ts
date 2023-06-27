/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebits/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'bluebits-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  endsubs$: Subject<any> = new Subject();
  products = [];

  constructor (private productService: ProductsService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
      this._getProducts()
  }

  ngOnDestroy(){
    this.endsubs$.complete();
}

  private _getProducts(){
    this.productService.getProducts().subscribe((product)=>{
      this.products = product
    })
  }

  updateProduct(productid: string){
    this.router.navigateByUrl(`products/form/${productid}`)
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe(() => {
          this._getProducts();
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: `Product is deleted`,
          });
        });
      },
      reject: () =>{}
    });
  }
}
