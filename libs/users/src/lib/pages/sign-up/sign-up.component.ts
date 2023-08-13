import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Authguard } from '../../services/authguard.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'bluebits-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit{
  isSubmitted = false;
  loginFormGroup!: FormGroup;
  authError = false;
  authMessage = 'Email or Password is wrong';

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private guardService: Authguard
  ) {}


  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;
    const loginData = {
      name: this.loginForm['name'].value,
      email: this.loginForm['email'].value,
      phone: this.loginForm['phone'].value,
      password: this.loginForm['password'].value,
    };
    this.auth.signUp(loginData.name, loginData.phone, loginData.email, loginData.password).subscribe(
      (user) => {
        this.authError = false;
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'SignUp successfully',
        });
        this.router.navigate(['/'])
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the server, plzz try again later';
        }
      }
    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
