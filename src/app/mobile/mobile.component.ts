import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent {

  eletronicData:any[] = []

  constructor(private productService:ProductsService , private route: Router){}

  ngOnInit(): void {
    this.productService.ProductsfilterForeletronic().subscribe((Data:any[]) => {
      console.log('reponse',Data);
      this.eletronicData = Data
    })
  }

  onClick(id: number) {
    this.route.navigate([`/products/${id}`]);
  }

}
