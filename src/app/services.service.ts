import {EventEmitter , Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicesService{
  constructor(private http: HttpClient, private route: Router) {
    const userData = JSON.parse(localStorage.getItem('home') || '{}');
    this.isSingIn.next(userData);
  }

  isSingIn = new BehaviorSubject<boolean>(false);
  loginError = new EventEmitter();

  UsersignUp(data: any) {
    this.http
      .post('https://shopping-x25o.onrender.com/singUp', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSingIn.next(true);
        localStorage.setItem('home', JSON.stringify([result.body]))
        this.route.navigate(['home']);
        console.log(result);
      });
  }
  UserlogIn(data: any) {
    console.log(data);
    this.http
      .get(
        `https://shopping-x25o.onrender.com/singUp?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.log("result",result)
        if (result && result.body && result.body.length) {
          localStorage.setItem('home', JSON.stringify(result.body))
          console.log(this.isSingIn.next(true))
          this.route.navigate(['home']);
          console.log('user loggin');
        } else {
          console.log('user fail to loggin');
          this.loginError.emit(true);
        }
      });
  }
}
