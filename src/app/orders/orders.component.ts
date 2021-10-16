import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Orders } from './models/orders';
import { OrdersService } from './OrdersService.ts/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [FormBuilder]
})
export class OrdersComponent implements OnInit {
  [x: string]: any;
  endPoint: string = '';

  public formOrder: FormGroup | undefined;
  public listOrder: Array<Orders>=[];

  constructor(private formBuild: FormBuilder, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.obtenerOrder();
    this.initForm();
  }

  initForm() {
    this.formOrders = this.formBuild.group({
      id: [],
      freight: ['', Validators.required, Validators.min(1), Validators.max(100000)],
      orderDate: ['', Validators.minLength(10)]
    });
  }

  get f() {
    return this.formOrders.controls;
  }

  guardarOrder() {
    const order: Orders = {
      freight: this.formOrders.get('freight').value,
      dateOrder: this.formOrders.get('dateOrder').value
    };
    const id = this.formOrders.get('id').value;

    if (id) {
      order.id = id;
      this.updateOrder(order);
    } else {
      this.crearOrder(order);
    }
    
    this.formOrder?.reset();
  }

  cancelarFormulario() {
    this.formOrder?.reset();
  }

  modificarOrder(order: Orders) {
    this.formOrder?.setValue(order);
  }

  crearOrder(order: Orders) {
    this.ordersService.CrearOrder(order).subscribe(res =>{
      console.log('se guardo la orden');
    });
  }

  obtenerOrder(){
    this.ordersService.ObtenerOrder().subscribe(res=>{
        this.listOrder = res;
        console.log(this.listOrder);
    });
  }
  deleteOrder(id: number | undefined){
    this.ordersService.DeleteRequestOrder(id as number).subscribe((res: Orders[])=>{
        this.listOrder = res;
        console.log(this.listOrder);
    });
  }

  updateOrder(order:Orders){
    this.ordersService.updateOrder(order).subscribe(res=>{
        this.listOrder = res;
        console.log(this.listOrder);
    });
  }
}
