import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product, ProductHistory } from 'src/app/interfaces/product';
import { ClientService } from 'src/app/services/client.service';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../../interfaces';

import Swal from 'sweetalert2'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public page:number | undefined;
  total:number = 0;
  incorrect:boolean = false;



  productCart:ProductHistory[] = [];
  url = `${environment.baseUrl}/uploads/products/`

  constructor(private clientService:ClientService,private authService:AuthService) {
      this.authService.validarToken().subscribe();
      this.productCart =  this.clientService.getProductCarShopping;
      this.productCart.forEach(product => product.quantity ??= 1)
      this.getPrice()
   }

  ngOnInit(): void {
  
  }


  getPrice(){
    this.productCart.forEach(p => this.total += p.quantity * p.price )
  }

  increment(product:ProductHistory){
      product.quantity = product.quantity + 1;
      this.incorrect = product.quantity < 1;
      this.total += product.price;
  }

  decrease(product:ProductHistory){
    console.log("paso")
    product.quantity = product.quantity - 1;
    this.incorrect = product.quantity < 1;
    console.log(this.incorrect)
    this.total -= product.price;
  }

  change(input:HTMLInputElement,product:ProductHistory){
    const value:number = Number(input.value)
    product.quantity = value
  }

  validateQuantity(input:HTMLInputElement):Boolean{

    return Number(input.value) > 0;
  }

  buy(){
    Swal.fire({
      title: 'Desea continuar con la compra?',

      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
      }).then((result) => {
      if (result.isConfirmed) {
          
          this.productCart.forEach( (product,index) =>{
            console.log(product)
            this.clientService.addProductHistory(this.authService.user._id,product).subscribe(res =>{
              if(res.ok){
                console.log(res.client)
              }
            })
          })
      } 
    })
  }

  deleteProduct(productIndex:any){
    Swal.fire({
      title: 'No hay una pagina principal',
      text: "Desea eliminar el producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
       this.productCart.splice(productIndex,1)
        localStorage.setItem("products",JSON.stringify(this.productCart))
      }
    })


   


  }
  

}
