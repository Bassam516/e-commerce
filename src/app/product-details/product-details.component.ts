import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgFor,CarouselModule,NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  idParam: any;
  productDetails: any;
  isAdded: boolean = false;
  constructor(private _ProductsService: ProductsService, private _ActivatedRoute:ActivatedRoute, private _CartService:CartService,private _ToastrService:ToastrService) { }
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.idParam = params.get('id');
    })
    this._ProductsService.getProductDetails(this.idParam).subscribe({
      next: (response) => {
        this.productDetails = response.data;
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  addToCart(id: string) {
    this.isAdded = true;
    this._CartService.addToCard(id).subscribe({
      next: (res) => {
        this.isAdded = false;
        this._ToastrService.success('Item Added To Cart Successfully','Add',{
          positionClass:'toast-bottom-right',
        })
      },
      error:(err)=> console.log(err)
    })
  }
}
