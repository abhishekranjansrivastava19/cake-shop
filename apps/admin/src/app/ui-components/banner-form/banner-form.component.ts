import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { bannerService, Banner } from '@bluebits/product'
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'bluebits-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.css']
})
  export class BannerFormComponent implements OnInit, OnDestroy {
    endsubs$: Subject<any> = new Subject();
    form: FormGroup;

    isSubmitted: boolean = false;

    editmode = false;

    currentBannerId: string;

    constructor(
      private messageService: MessageService,
      private formbuilder: FormBuilder,
      private bannerService: bannerService,
      private route: ActivatedRoute,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.form = this.formbuilder.group({
        name: ['', Validators.required],
        image: ['', Validators.required],
        description: ['', Validators.required]
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
      const banner: Banner = {
        _id: this.currentBannerId,
        name: this.bannerForm.name.value,
        image: this.bannerForm.image.value,
        description: this.bannerForm.description.value
      };
      if (this.editmode) {
        this._UpdateBanner(banner);
      } else {
        this._addBanner(banner);
      }
    }

    private _UpdateBanner(banner: Banner) {
      this.bannerService.UpdateBanner(banner).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Category is Updated',
        });
      });
    }

    private _addBanner(banner: Banner) {
      this.bannerService.createBanner(banner).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: `Category ${banner.name} is created`,
        });
      });
    }

    private _checkEditMode() {
      this.route.params.subscribe((params) => {
        if (params._id) {
          this.currentBannerId = params._id;
          this.editmode = true;
          this.bannerService.getBanner(params._id).pipe(takeUntil(this.endsubs$)).subscribe((banner: { name: any; image: any; description: any; }) => {
            this.bannerForm.name.setValue(banner.name);
            this.bannerForm.image.setValue(banner.image);
            this.bannerForm.description.setValue(banner.description);
          });
        }
      });
    }

    get bannerForm() {
      return this.form.controls;
    }
}
