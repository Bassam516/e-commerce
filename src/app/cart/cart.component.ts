import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgFor,NgIf,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService, private _ToastrService:ToastrService) { }
  cartProducts: any;
  isDeleted: any = [];
  isCleared: boolean = false;
  ngOnInit(): void {
    this._CartService.getLoggedUserCard().subscribe({
      next: (res) => {
        this.cartProducts = res.data;
      },
      error:(err)=>console.log(err)
    })
  }

  deleteCartItem(id: string, i:number) {
    this.isDeleted[i] = true;
    this._CartService.deleteCartItem(id).subscribe({
      next: (res) => {
        this.cartProducts = res.data;
        if (this.cartProducts) {
          this.isDeleted[i] = false;
        }
        this._ToastrService.error('Item Deleted Succefully','Delete',{
          positionClass:'toast-bottom-right',
        })
        this._CartService.cartItemCount.next(res.numOfCartItems);
      },
      error:(err)=>console.log(err)
    })
  }

  updateItemCount(id:string, count:number) {
    this._CartService.updateItemCount(id, count).subscribe({
      next: (res) => {
        this.cartProducts = res.data;
      },
      error:(err)=>console.log(err)
    })
  }

  clearCart() {
    this.isCleared = true;
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this.cartProducts = [];
        this.isCleared = false;
        this._CartService.cartItemCount.next(res.numOfCartItems);
      },
      error:(err)=> console.log(err)
    })
  }

}
