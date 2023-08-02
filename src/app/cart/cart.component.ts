import { Component, EventEmitter } from '@angular/core';
import { ProductsService } from '../products.service';
import { Price, cart } from '../product.Model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  length!: number;
  cartData: any[] = [];
  cartlength = new EventEmitter<number>
  popup:boolean = false
  priceSummary: Price = {
    id:0,
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private productService: ProductsService , private route:Router) {}

  ngOnInit(): void {
    this.localData()
    console.log(this.cartlength)
  }


  removeToCart(cartId:number|undefined){
    cartId && this.productService.RemoveFromCart(cartId)
    .subscribe((result)=>{
      
      this.localData();
    })
    console.log(cartId)
  }

  localData(){
    this.productService.currentCart().subscribe((result) => {
      console.log(result)
      this.cartData = result;
      // console.log(this.cartData.length) //emit this value
      this.length = this.cartData.length
      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
        price = price + (+item.price* +item.quantity);
        }
      });
      this.priceSummary.price=price
      this.priceSummary.discount= price/10.0;
      this.priceSummary.tax=price/10.0;
      if(this.priceSummary.price === 0){
        this.priceSummary.delivery=0;
        this.priceSummary.total=0
        
      } else{
        this.priceSummary.delivery=100;
        this.priceSummary.total=price + (price/11)+100-(price/11);
      }

      if(!this.cartData.length){
        this.popup = true
      }
      
    });
    console.log(this.length)
  }


  onCheckout(){
    if(this.cartData.length){
      this.route.navigate(['checkout'])
    }
  }

  shopNow(){
    this.route.navigate(['home'])
  }
}
