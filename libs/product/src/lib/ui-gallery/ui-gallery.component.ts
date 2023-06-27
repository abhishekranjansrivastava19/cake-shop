/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bluebits-ui-gallery',
  templateUrl: './ui-gallery.component.html',
  styles: [
  ]
})
export class UiGalleryComponent implements OnInit{
  selectedImage!: string[];
  @Input()
  image!: string[];
  constructor () { }

  ngOnInit(): void {
    if(this.image.length) {
      this.selectedImage = this.image
    }
  }
}
