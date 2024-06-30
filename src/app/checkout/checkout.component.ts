import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  constructor(private _CartService: CartService, private _ActivatedRoute:ActivatedRoute) { }
  isLoading: boolean = false;
  cartId: any;
  completePayment(url:string) {
    window.location.href = url;
  }

  paymentForm: FormGroup = new FormGroup({
    details:new FormControl(null,Validators.required),
    phone:new FormControl(null,Validators.required),
    city:new FormControl(null,Validators.required),
  })

  onlinePayment(paymentForm: FormGroup) {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.cartId = params.get('id');
    })
    this.isLoading = true;
    this._CartService.onlinePayment(paymentForm.value, this.cartId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.completePayment(res.session.url);
      },
      error:(err)=>console.log(err)
    })
    
  }
}
