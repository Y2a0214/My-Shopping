import { Component } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cart } from '../product.Model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  
  addresform:any
  totalPrice:number | undefined
  fromModal:any
  submited:string = ''
  closeResult = '';
  todayDate!: Date;
  cartData: cart[]|undefined

  constructor(private fb:FormBuilder , private productService:ProductsService , private route:Router , private modalService: NgbModal){}

  ngOnInit(): void {
      this.addresform = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
          ]),
        ],
        contact: ['', Validators.compose([Validators.required])],
        address: this.fb.group({
          streetname:['', Validators.compose([Validators.required])],
          city:['', Validators.compose([Validators.required])],
          pincode:['', Validators.compose([Validators.required])],
        })
      });
      this.totalcheckout()

    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 1)
    this.todayDate = currentDate  
  }

  totalcheckout(){
    this.productService.currentCart().subscribe((result) => {
      let price =0
      this.cartData = result
      result.forEach((item) => {
        if(item.quantity){
        price = price + (+item.price* +item.quantity);
        }
      });
      this.totalPrice = price + (price/10)+100-(price/10);
    });
  }


  onSubmit(data:any){
    if(data){
      this.submited = 'Order Placed Succesfully'
      this.addresform.reset()  
    }
    this.cartData?.forEach((item) =>
        {item.id && this.productService.deletCartdata(item.id)}
      )

    
  }

  toHome(){
    this.route.navigate(['home'])
  }

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
