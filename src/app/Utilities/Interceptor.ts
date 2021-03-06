import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { DomainName } from './PathTools';

@Injectable({
    providedIn: 'root'
  })
export class Interceptor implements HttpInterceptor{

    constructor(private cookie: CookieService){ }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.cookie.get('b0059215-7da3-4574-8542-945cd4094477');

        const request = req.clone({
            url : DomainName + req.url,
            headers: req.headers.append('Authorization', 'Bearer ' + token)//.append('Content-Type','application/json')
        });

        return next.handle(request);
    }
    
}