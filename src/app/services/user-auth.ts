import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from '../modules/iusers';

@Service()
export class UserAuth {
    
    http =inject(HttpClient)
    login(userName:string,pass:string):Observable<{"token":string}>{
        console.log("funcCalled")
        return this.http.post<{ "token":string}>('https://fakestoreapi.com/auth/login',{
            "username":userName,
            "password" : pass
        })
    }

    register(deta:IUsers){
        return this.http.post<IUsers>('https://fakestoreapi.com/users',deta)
    }
}
