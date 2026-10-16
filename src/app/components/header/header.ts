import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  constructor(private router : Router,
    private searchService :SearchService,
    private _cart : CartService,
            private cdr:ChangeDetectorRef,

  ){}

  ngOnInit(): void {
    this._cart.total.subscribe(
      (v)=>{
        this.cartCount=v
        this.cdr.detectChanges()
      }
    )
  }
  cartCount=0
  logOut(){
    localStorage.removeItem("token")
    this.router.navigateByUrl("login")
  }
  search(){
    this.router.navigateByUrl('product')
  }
  Search(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
        this.searchService.setSearchTerm(value);
  }
}
