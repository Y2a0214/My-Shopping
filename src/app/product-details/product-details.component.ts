import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product } from '../product.Model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  
  mensProducstid:any
  mensProductid:any
  productId: any;
  ProductsId: any;
  productQuantity: number = 1;
  removeCart = false;
  CartData: product | undefined;
  todayDate!: Date;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.productService
        .getProductById(this.productId)
        .subscribe((product) => {
          this.ProductsId = product;
          let cartData = localStorage.getItem('localCart');
          if (this.productId && cartData) {
            let item = JSON.parse(cartData);
            item = item.filter((value: any) => {
              this.productId === item.id;
              if (item.length) {
                this.removeCart = true;
              } else {
                this.removeCart = false;
              }
            });
          }
          let user = localStorage.getItem('home');
          if (user) {
            let userId = user && JSON.parse(user)[0].id;
            this.productService.getCartList(userId);
            this.productService.cartData.subscribe((result) => {
              let item = result.filter(
                (item: any) =>
                  this.productId?.toString() === item.productID.toString()
              );
              if (item.length) {
                this.CartData = item[0];
                this.removeCart = true;
              }
            });
          }
        });
    });
    // this.mensProductgetId()

    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 1)
    this.todayDate = currentDate
  }

  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'pluse') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity -= 1;
    }
  }

  AddToCart() {
    //localdataAddtocart
    if (this.ProductsId) {
      this.ProductsId.quantity = this.productQuantity;
      if (!localStorage.getItem('home')) {
        this.productService.localAddtoCart(this.ProductsId);
        this.removeCart = true;
      } else {
        console.log('user');
        let user = localStorage.getItem('home');
        let userId = user && JSON.parse(user)[0].id;
        console.log(userId);
        let cartData: cart = {
          ...this.ProductsId,
          userId,
          productID: this.ProductsId.id,
        };
        delete cartData.id;

        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
    this.router.navigate(['cart'])
  }

  RemoveFromCart(productid: number) {
    if (!localStorage.getItem('home')) {
      this.productService.removeItemFromCart(productid);
      
    } else {
      console.log(this.CartData)
      let user = localStorage.getItem('home');
      let userId = user && JSON.parse(user)[0].id;
      this.CartData &&
        this.productService
          .RemoveFromCart(this.CartData.id)
          .subscribe((result) => {
            if (result) {
              this.productService.getCartList(userId);
            }
          });
          this.removeCart = false;
    }
  }

  checkout(){
    this.router.navigate(['checkout'])
  }
}
