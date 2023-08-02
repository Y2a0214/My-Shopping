import { EventEmitter ,  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cart, product } from './product.Model'
import { map , tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  cartData = new EventEmitter<any[]>

  constructor(private http:HttpClient) { }

  Products(){
   return this.http.get<any[]>('http://localhost:3000/products')
  }

  Productsfilter(){
    return this.http.get<any[]>('http://localhost:3000/products').pipe(
      map((response: any[]) => response.filter(value =>  value.category == 'mens clothing'))
   )
  }

  ProductsfilterForeletronic(){
    return this.http.get<any[]>('http://localhost:3000/products').pipe(
      map((response: any[]) => response.filter(value =>  value.category == 'smartphones' || value.category == 'laptops' ))
   )
  }


  getProductById(id:number){
    return this.http.get(`http://localhost:3000/products/${id}`)
  }

  popularProducts(){
    return this.http.get<any[]>('http://localhost:3000/products?_limit=2')
  }

  searchProduct(query:string | null){
    return this.http.get<any[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddtoCart(data:any){ //localdataAddtocart
    let cartData1 = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart' , JSON.stringify([data]))
    this.cartData.emit([data])
    } else {
      cartData1 = JSON.parse(localCart);
      cartData1.push(data)
      localStorage.setItem('localCart' , JSON.stringify(cartData1))
    this.cartData.emit(cartData1 )
    }
  }

  removeItemFromCart(productId:number){ //if we re deleting it from localstroage
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: any[] = JSON.parse(cartData)
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
      console.log(items)
    }
  }

  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart' , cartData)
  }

  getCartList(userId:number){
    return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId,
    {observe:'response'}).subscribe(( result) => 
      {
        // console.warn(result)
        if(result && result.body){
        this.cartData.emit(result.body)
      }
      }
    )
  }

  RemoveFromCart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/' + cartId)
  }

  currentCart(){
    let userStorage = localStorage.getItem('home');
    let userData = userStorage && JSON.parse(userStorage)[0];
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id)
  }
}
