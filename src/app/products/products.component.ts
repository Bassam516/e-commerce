import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ShrinkDescriptionPipe } from '../shrink-description.pipe';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor,ShrinkDescriptionPipe,RouterLink,NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  allProducts: any = [];
  productsLimit = new BehaviorSubject(4);
  isLoading: boolean = false;
  isDisabled: boolean = false;
  constructor(private _HttpClient:HttpClient) { }

  getAllProducts(limit:any):Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products', {
      params: {
        limit:limit
      }
    })
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.getAllProducts(this.productsLimit.value).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.isLoading = false;
        if (this.productsLimit.value > res.metadata.limit) {
          this.isDisabled = true;
        }
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  showMore() {
    this.productsLimit.next(this.productsLimit.value + 4);
    this.ngOnInit();
  }
}
