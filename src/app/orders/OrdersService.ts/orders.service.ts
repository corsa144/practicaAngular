import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Orders } from '../models/orders';
//import { AppModule } from './..orders.module';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  endPoint: any = "api/Orders";
  constructor(private http: HttpClient) { }

  public CrearOrder(OrderRequest: Orders): Observable<any> {
    let url = environment.apiOrders + this.endPoint;
    return this.http.post(url, OrderRequest);
  }


  public ObtenerOrder(): Observable<Array<Orders>> {
    let url = environment.apiOrders + this.endPoint;
    return this.http.get<Array<Orders>>(url);
  }

  DeleteRequestOrder(id: number): Observable<Orders[]> {
    let url = environment.apiOrders + this.endPoint + '/' + id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    
    return this.http.delete<Orders[]>(url);
  }



  updateOrder(order: Orders): Observable<any> {
    let url = environment.apiOrders + this.endPoint;
    const options = {
      body: {
        order: order
      }
    }
    return this.http.put(url, options);
  }
}

