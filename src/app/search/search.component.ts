import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:any[] =[]

  constructor(private router:ActivatedRoute , private productServive:ProductsService , private route:Router){}

  ngOnInit(): void {
      let query =  this.router.snapshot.paramMap.get('query')
      this.productServive.searchProduct(query).subscribe( (result) =>
        this.searchResult = result
      )
  }

  onClick(id: number) {
    this.route.navigate([`/products/${id}`]);
  }
}
