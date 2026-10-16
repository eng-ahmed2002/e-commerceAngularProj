import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ICart, Iproduct } from '../../modules/iproduct';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  products :Iproduct[] =[]as Iproduct[]
  Carts :ICart[]=[]as ICart[]
  totalPrice:number=0
  constructor(private _cart : CartService,
            private cdr:ChangeDetectorRef,

  ){}


  ngOnInit(): void {
    this._cart.getProduct().subscribe(
      (v)=>{
        this.Carts=[]
        this.products=v
        for(let prd of v){
            this.Carts.push({"prd":prd,additinal:{count:1,totalPrice:1}})
            this.totalPrice+=prd.price
        }
        this.cdr.detectChanges()
    });
  }
  
plus(prd: ICart): void {
    prd.additinal.count++;
    this.totalPrice+=prd.prd.price
  }

  min(prd: ICart): void {
    if (prd.additinal.count > 1) {
      prd.additinal.count--;
      this.totalPrice-=prd.prd.price
    }
  }

  removeItem(id : number): void {
    this._cart.removeProduct(id)
    this.cdr.detectChanges()
    // this.Carts= this.Carts.filter((v)=>v.prd.id !== prd.id)
    
  }
  checkout(){
    if(this.products.length !=0){
    this._cart.newCart(this.products).subscribe(
      ()=>{
        alert("cart created successfully")
        this.Carts=[]
        this._cart.clear()
        this.cdr.detectChanges()
      }
    )
  }else{
    alert("you have no item")
  }}
}
