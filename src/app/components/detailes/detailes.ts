import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Iproduct } from '../../modules/iproduct';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detailes',
  imports: [CommonModule],
  templateUrl: './detailes.html',
  styleUrl: './detailes.css',
})
export class Detailes implements OnInit{

  product : Iproduct={}as Iproduct


  constructor(private _router :ActivatedRoute,
              private _api : ProductService,
              private cdr:ChangeDetectorRef,
              private _cart :CartService

  ){}
    ngOnInit() {
      this._router.paramMap.subscribe((params) => {
      
      this._api.getProductById(Number(params.get('id'))).subscribe({
        next: (data) => {
          this.product = data;
          this.cdr.detectChanges(); // Trigger change detection after updating the product
        },
        error: (err) => {
          console.error('Error fetching product by ID:', err);
        },
      });
    });
  }
getStars(rate: number ): string[] {
  const stars: string[] = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rate)) {
      stars.push('fa-solid fa-star');              
    } else if (i - 0.5 <= rate) {
      stars.push('fa-solid fa-star-half-stroke');  
    } else {
      stars.push('fa-regular fa-star');           
    }
  }
  
  return stars;
}
  addPrd(){
    this._cart.addProduct(this.product)
    alert("product added to cart")
  }

}
