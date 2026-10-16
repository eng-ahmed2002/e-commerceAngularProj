import { inject, Service } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Iproduct } from '../modules/iproduct';
import { HttpClient } from '@angular/common/http';

@Service()
export class CartService {
    http = inject(HttpClient)

    products =new BehaviorSubject<Iproduct[]>([]as Iproduct[])
    total=new BehaviorSubject<number>(0)

    addProduct(prd : Iproduct){
        const currentProducts = this.products.value.filter((v)=>v.id!==prd.id);
        const updatedProducts = [...currentProducts, prd];
        this.products.next(updatedProducts);
        this.total.next(updatedProducts.length)
    }
    removeProduct(id : number){
        const currentProducts = this.products.value
        const updatedProducts = currentProducts.filter((v)=>v.id!== id);
        this.products.next(updatedProducts);
        this.total.next(updatedProducts.length)
    }

    getProduct():Observable<Iproduct[]>{
        return this.products.asObservable()
    }

    newCart(prd : Iproduct[]){
        return this.http.post("https://fakestoreapi.com/carts",{id:1,userId:2,"products":prd})
    }

    clear(){
        this.products.next([]);
        this.total.next(0)
    }
}
