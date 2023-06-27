import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerComponent } from "./banner/banner.component";
import { SliderComponent } from './slider/slider.component';
import { ButtonModule } from 'primeng/button'
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule],
  declarations: [BannerComponent, SliderComponent],
  exports: [BannerComponent, SliderComponent]
})

export class UiModule {}
