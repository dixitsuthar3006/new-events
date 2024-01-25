import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginResponse } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';
  alertInterval: any;
  isLoading = false;

  private _authService = inject(AuthService);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=<>?]).*$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(passwordPattern),
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      userType: ['volunteer', Validators.required],
    });
  }

  closeAlert() {
    if (this.error != '') {
      this.alertInterval = setInterval(() => {
        this.error = '';
        clearInterval(this.alertInterval);
      }, 3000);
    }
  }

  close() {
    if (this.error != '') {
      this.error = '';
      clearInterval(this.alertInterval);
    }
  }

  onLogin() {
    this.isLoading = true; // loader in
    const formData = this.loginForm.value;
    // console.log(this.loginForm.value);
    // return;
    this._authService
      .login(formData.email, formData.password, formData.userType)
      .subscribe((res: LoginResponse) => {
        // setTimeout(() => {   //fake loading
        console.log(res);

        this.isLoading = false; // loader out

        if (res.status === 'error') {
          if (res.message) {
            this.error = res.message;
          } else {
            this.error = 'Something went wrong';
          }
          this.closeAlert();
        }
        // }, 1500);
      });
  }
}
