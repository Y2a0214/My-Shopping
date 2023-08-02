import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName = '';
  searchResult: any[] = [];
  cartItem: number = 0;
  cartData: any[] = [];
  @ViewChild('searchInput')searchInput!: ElementRef;

  constructor(private route: Router, private productService: ProductsService) {console.log(this.cartData)}

  ngOnInit(): void {
    this.route.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('home') && value.url.includes('home')) {
          console.log('in home');
          let sellerStorage = localStorage.getItem('home');
          let sellerData = sellerStorage && JSON.parse(sellerStorage)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'home';
        } else if (localStorage.getItem('home')) {
          let sellerStorage = localStorage.getItem('home');
          let sellerData = sellerStorage && JSON.parse(sellerStorage)[0];
          this.sellerName = sellerData.name;
          this.menuType= 'home'
          this.productService.getCartList(sellerData.id)
        } else {
          console.log('out home');
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
    console.log(this.cartData)

    this.productService.cartData.subscribe(
      (item) => (this.cartItem = item.length)
    );
  }
  logOut() {
    localStorage.removeItem('home');
    this.route.navigate(['/login']);
    this.productService.cartData.emit([]);

  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe((result) => {
        console.log(result);
        if (result.length > 4) {
          result.length = 4;
        } 
        
        this.searchResult = result;
      });
    }
    console.log(query)
  }

  hindSearch() {
    this.searchResult = [];
  }

  submitSearch(value: string) {
    this.route.navigate([`search/${value}`]);
    this.searchInput.nativeElement.value = '';
    console.log(this.searchInput)
  }

  redirectToDetails(title: number) {
    this.route.navigate([`search/${title}`]);

  }

}

