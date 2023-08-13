/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@bluebits/product';
import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import { Subject, takeUntil } from 'rxjs';
declare const require;

@Component({
  selector: 'bluebits-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent implements OnInit, OnDestroy{
  endsubs$: Subject<any> = new Subject();
  editmode = false;
  form: FormGroup;
  isSubmitted: boolean = false;
  users = [];
  currentUserId: string;
  countries = [];

  constructor(private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private userService: UsersService,
  ){}

  ngOnInit(): void {
    this._initForm();
    this._getUsers();
    this._getCountries();
    this._checkEditMode();
}

ngOnDestroy(){
  this.endsubs$.complete();
}
private _initForm() {
  this.form = this.formBuilder.group({
    id: this.currentUserId,
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    isAdmin: [false],
    street: [''],
    apartment: [''],
    zip: [''],
    city: [''],
    country: ['']
  });
}

private _getCountries(){
  countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map((entry)=>{
    return {
      _id: entry[0],
      name: entry[1]
    }
  })
}

private _getUsers() {
  this.userService.getUsers().pipe(takeUntil(this.endsubs$)).subscribe((users) => {
    this.users = users;
  });
}

onSubmit() {
  this.isSubmitted = true;
  if (this.form.invalid) {return}

  const user: User = {
    id: this.currentUserId,
    name: this.userForm.name.value,
    email: this.userForm.email.value,
    phone: this.userForm.phone.value,
    password: this.userForm.password.value,
    isAdmin: this.userForm.isAdmin.value,
    street: this.userForm.street.value,
    apartment: this.userForm.apartment.value,
    zip: this.userForm.zip.value,
    city: this.userForm.city.value,
    country: this.userForm.country.value,
  }

  if (this.editmode) {
    this._updateUser(user);
  } else {
    this._addUser(user);
  }
}

private _updateUser(user: User) {
  this.userService
    .UpdateUser(user).pipe(takeUntil(this.endsubs$))
    .subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: `User is Updated`,
      });
    });
}

private _addUser(user: User) {
  this.userService
    .createUsers(user).pipe(takeUntil(this.endsubs$))
    .subscribe((user: User) => {
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: `User ${user.name} is created`,
      });
    });
}

private _checkEditMode() {
  this.route.params.subscribe((params) => {
    if (params._id) {
      this.currentUserId = params._id;
      this.editmode = true;
      this.userService.getUser(params._id).pipe(takeUntil(this.endsubs$)).subscribe((user) => {
        this.userForm.name.setValue(user.name);
        this.userForm.email.setValue(user.email);
        this.userForm.phone.setValue(user.phone);
        this.userForm.isAdmin.setValue(user.isAdmin);
        this.userForm.street.setValue(user.street);
        this.userForm.apartment.setValue(user.apartment);
        this.userForm.zip.setValue(user.zip);
        this.userForm.city.setValue(user.city);
        this.userForm.country.setValue(user.country);
        this.userForm.password.setValidators([]);
        this.userForm.password.updateValueAndValidity();
      });
    }
  });
}

get userForm() {
  return this.form.controls;
}

}
