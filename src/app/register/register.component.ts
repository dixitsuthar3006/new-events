import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  usernameImagePath: string = '/assets/icons/correct.png';
  passwordValidations = [
    { title: 'required', message: 'Required' },
    {
      title: 'pattern',
      message: 'One upper case , one lower case and one digit',
    },
    { title: 'minlength', message: 'Minimum 8 digits' },
    { title: 'maxlength', message: 'Maximum 20 digits' },
  ];

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=<>?]).*$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    this.signUpForm = this._fb.group({
      username: ['', Validators.required],
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
      confirmPassword: ['', Validators.required],
      userType: ['volunteer', Validators.required],
      organization: '',
      terms: [false, [Validators.required, this.checkTermsValidator]],
    });
  }

  passwordsMatch(): boolean {
    const password = this.signUpForm.get('password').value;
    const confirmPassword = this.signUpForm.get('confirmPassword').value;
    if (this.signUpForm.get('confirmPassword').touched) {
      return password === confirmPassword;
    }
  }

  getValidationImagePath(validate: string): string {
    if (this.signUpForm.get('password').value === '') {
      return '/assets/icons/cross.png';
    }
    return this.signUpForm.get('password').hasError(validate)
      ? '/assets/icons/cross.png'
      : '/assets/icons/correct.png';
  }

  onRegister() {
    console.log(this.signUpForm.value);
  }

  checkTermsValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === false) {
      return { checkTerm: true };
    }
    return null;
  }
}
