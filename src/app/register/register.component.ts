import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService, private _Router:Router) {
    
  }

  isLoading: boolean = false;
  errMsg: string = '';
  showPassword: boolean = false;
  showrePassword: boolean = false;

    registerForm: FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{10}$/)]),
    rePassword: new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{10}$/)]),
    phone: new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}/)]),
    },{validators: this.rePasswordMatch});
  
  rePasswordMatch(registerForm: any) {
    let passwordInput = registerForm.get('password');
    let rePasswordInput = registerForm.get('rePassword');

    if (passwordInput?.value === rePasswordInput?.value) {
      return null;
    } else {
      rePasswordInput?.setErrors({ rePasswordMatch: 'password and rePassword doesnt matched' });
      return { rePasswordMatch: 'password and rePassword doesnt matched' };
    }
  }
  
  handleRegister(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoading = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          if (err.error.errors) {
            this.errMsg = err.error.errors.msg;
          } else {
            this.errMsg = err.error.message;
          }
          
        }
      });
    }
  }
}
