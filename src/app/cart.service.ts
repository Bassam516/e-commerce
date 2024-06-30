import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // userToken: any = {
  //   token:localStorage.getItem('userToken')
  // }

  cartItemCount = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) { 
    this.getLoggedUserCard().subscribe({
      next: (res) => {
        this.cartItemCount.next(res.numOfCartItems);
      },
      error:(err)=> console.log(err)
    })
  }
  
  addToCard(id:string):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:id})
  }

  getLoggedUserCard():Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }

  deleteCartItem(id:string):Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  updateItemCount(id:string, count:number):Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count })
  }

  clearCart():Observable<any> {
   return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart') 
  }

  onlinePayment(shippingAddress:any, cartId:string): Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shippingAddress }
    )
  }
}

