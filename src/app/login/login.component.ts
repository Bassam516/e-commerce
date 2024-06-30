import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoading: boolean = false;
  errMsg: string = '';
  showPassword: boolean = false;
  constructor(private _AuthService:AuthService, private _Router:Router){}
  loginForm: FormGroup = new FormGroup({
    email:new FormControl(null),
    password:new FormControl(null)
  });

  handleLogin(loginForm: FormGroup) {
    this.isLoading = true;
    this._AuthService.login(loginForm.value).subscribe({
      next: (response) => {
        if (response.message == 'success') {
          localStorage.setItem('userToken', response.token);
          this._AuthService.decodeUsreToken();
          this.isLoading = false;
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err)
          if (err.error.errors) {
            this.errMsg = err.error.errors.msg;
          } else {
            this.errMsg = err.error.message;
          }
          
        }
    });
  }

}
