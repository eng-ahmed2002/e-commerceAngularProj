import { ChangeDetectorRef, Component, computed, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Iproduct } from '../../modules/iproduct';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Service, signal } from '@angular/core';


@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  isLoading = true;
  products :Iproduct[]=[] as Iproduct[]
  allproducts :Iproduct[]=[] as Iproduct[]
  @Output() categoryChange = new EventEmitter<string>();
  categories = [
    { id: 'all', label: 'All' },
    { id: "men's clothing", label: "men's clothing"},
    { id: 'jewelery', label: "jewelery" },
    { id: 'electronics', label: "electronics" },
    { id: "women's clothing", label:  "women's clothing" }
  ];
  selectedCategory: string = 'all';

  constructor(private _products:ProductService,
        private cdr:ChangeDetectorRef,
        private router : Router,
        private search :SearchService

  ){}


  selectCategory(id: string): void {
    this.selectedCategory = id;
    this.categoryChange.emit(id);
    this._products.getProductsByCat(id).subscribe(
      (v)=>{
        this.products=v
        this.cdr.detectChanges()
              this.isLoading=false

      }
    )
  }

  ngOnInit(): void {
    this._products.getAllProducts().subscribe({
      next:
      (val)=>{
        this.products = val
        this.allproducts = val
      this.cdr.detectChanges()
      this.isLoading=false
    },
    error:(e)=>this.isLoading=false

  }
    )
    this.search.searchTerm.subscribe((term) => {
    if (!term.trim()) {
      this.products = [...this.allproducts]; 
    } else {
      this.products = this.allproducts.filter(item =>
        item.title.toLowerCase().includes(term.toLowerCase()) 
      );
    }
    this.cdr.detectChanges();
  });
  }
  showDetaile(id :number){
        this.router.navigateByUrl(`/details/${id}`);
  }
}
