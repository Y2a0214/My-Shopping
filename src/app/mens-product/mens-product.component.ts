import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mens-product',
  templateUrl: './mens-product.component.html',
  styleUrls: ['./mens-product.component.css']
})
export class MensProductComponent implements OnInit{

  userData:any[] = []

  constructor(private productService:ProductsService , private route: Router){}

  ngOnInit(): void {
    this.productService.Productsfilter().subscribe((userData:any[]) => {
      console.log('reponse',userData);
      this.userData = userData
    })
  }

  onClick(id: number) {
    this.route.navigate([`/products/${id}`]);
  }

}
