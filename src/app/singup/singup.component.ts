import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { cart, product } from '../product.Model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  singUpform: any;
  logInform: any;
  errorLogin: string = '';
  Showpassword:boolean = false
  romoveimg= true

  showLogin = false;

  constructor(
    private fb: FormBuilder,
    private service: ServicesService,
    private route: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.singUpform = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ]),
      ],
    });
    this.logInform = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
  }
  UsersignUp(data: any): void {
    this.service.UsersignUp(data);

  }

  logIn() {
    this.showLogin = true;
  }

  singUp() {
    this.showLogin = false;
  }

  UserlogIn(data: any) {
    this.service.UserlogIn(data);
    this.service.loginError.subscribe((error) => {
      console.log(error);
      if (error) {
        this.errorLogin = 'Email and Password is not correct';
      } else {
        this.localCartToRemoteCart();
      }
    });

  }

  

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('home');
    let userId = user && JSON.parse(user)[0].id;
    if (data) {
      let cartDataList: any[] = JSON.parse(data);
      cartDataList.forEach((product: any, index) => {
        let cartData: cart = {
          ...product,
          productID: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('item stored in db');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
    this.productService.getCartList(userId)
    }, 2000);
  }

  seePassword(){
    this.Showpassword = !this.Showpassword
  }
}
