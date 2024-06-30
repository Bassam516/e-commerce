import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isLogin: boolean = false;
  cartItemCountVal: number = 0;
  constructor(private _AuthService:AuthService, private _CartService:CartService) {
  
    _AuthService.userData.subscribe({
      next: () => {
        if (_AuthService.userData.getValue() != null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    });

    _CartService.cartItemCount.subscribe({
      next: (val) => this.cartItemCountVal = val,
      error:(err)=>console.log(err)
    })
  } 

  logOut() {
    this._AuthService.logOut();
  }

}
