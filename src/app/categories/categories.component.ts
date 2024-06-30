import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  allCategories: any = [];
  constructor(private _ProductsService: ProductsService) { }
  
  ngOnInit(): void {
    this._ProductsService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },
      error: (err) => console.log(err)
    })
  }
}
