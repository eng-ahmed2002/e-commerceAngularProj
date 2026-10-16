import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Iproduct } from '../modules/iproduct';

@Service()
export class ProductService {
        http =inject(HttpClient)

        getAllProducts():Observable<Iproduct[]>{
            return this.http.get<Iproduct[]>("https://fakestoreapi.com/products")
        }
        getProductById(id :number):Observable<Iproduct>{
            return this.http.get<Iproduct>(`https://fakestoreapi.com/products/${id}`)
        }
        getProductsByCat(cat : string):Observable<Iproduct[]>{
            return this.http.get<Iproduct[]>("https://fakestoreapi.com/products").pipe(
                map((products: Iproduct[]) => products.filter(item => item.category === cat || cat==="all"))            )
        }
}
