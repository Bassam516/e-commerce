import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { IntegerPipe } from '../integer.pipe';
import { ShrinkDescriptionPipe } from '../shrink-description.pipe';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,RouterLink,CarouselModule,CurrencyPipe,SearchPipe,FormsModule,NgIf,IntegerPipe,ShrinkDescriptionPipe,NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allProducts: any[] = [];
  allCategories: any[] = [];
  searchTerm: string = '';
  isAdded: any = [];
  constructor(private _ProductsService: ProductsService, private _CartService:CartService, private _ToastrService:ToastrService, private _NgxSpinnerService:NgxSpinnerService) {
    
   }
  
  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
        this._NgxSpinnerService.hide();
      },
      error: (err) => {
        console.log(err);
      }
    });

    this._ProductsService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data;
      },
      error: (err) => {
        console.log(err);
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

  categoryCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      }
    },
    nav: true
  }

  addToCart(id: string, i:number) {
    this.isAdded[i] = true;
    this._CartService.addToCard(id).subscribe({
      next: (res) => {
        this.isAdded[i] = false;
        this._CartService.cartItemCount.next(res.numOfCartItems);
        this._ToastrService.success('Item Added To Cart Successfully', 'Add', {
          positionClass:'toast-bottom-right',
        })
      },
      error:(err)=> console.log(err)
    })
  }

  counter(i: any) {
    return new Array(parseInt(i));
  }
}
