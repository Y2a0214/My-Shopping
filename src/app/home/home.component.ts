import { Component } from '@angular/core';

import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { map , tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProduct:any[] = []

  ProductDetails: any[] = [];

  

  constructor(private productService: ProductsService, private route: Router) {}

  ngOnInit(): void {
    this.Products();
    this.productService.popularProducts().subscribe((data:any) => {console.log(data); this.popularProduct = data});

    
      
    // this.ProductDetails.map((value) => {
    //   if(value.category === "men's clothing" || value.category === "smartphones" ){
    //     value.category === "Mens"
    //   } 
    //   console.log("res",value.category)
    // });
    
  }

  onClick(id: number) {
    this.route.navigate([`/products/${id}`]);
  }

  Products() {
    this.productService.Products().subscribe((value) => {
      console.log(value);
      this.ProductDetails = value;
    });
  }
}
