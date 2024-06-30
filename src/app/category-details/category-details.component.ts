import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit{
  categoryId: any = '';
  category: any = {};
  constructor(private _ProductsService: ProductsService, private _ActivatedRoute:ActivatedRoute) { }
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.categoryId = param.get('id');
    })

    this._ProductsService.getCategoryDetails(this.categoryId).subscribe({
      next: (res) => {
        this.category = res.data;
      },
      error:(err)=> console.log(err)
    })
  }

}
