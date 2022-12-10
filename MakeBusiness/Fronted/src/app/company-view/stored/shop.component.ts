import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  public page:number | undefined;
  user?:User;
  products:Product[] = []
  url:string = `${environment.baseUrl}/uploads/products`


  constructor(
    private companyService:CompanyService,
    private authService:AuthService,
    private clientService:ClientService,
    private router:Router
  ) { 

    this.authService.validarToken().subscribe(valid=>{ 
        if(valid) this.user = this.authService.user;
    })

    this.companyService.getCompanyProducts(this.companyService.getCurrentIDCompany).subscribe(res =>{
      if(res.ok){
        // console.log(`${this.url}/${res.products[0].image}`)
        this.products = res.products
    
      } 
    })
  }

  ngOnInit(): void {
  }

  addShoppingCar(product:Product){
    let names:string[] = [];
    
    if(this.user && this.user.type == "client"){
      let names:any = localStorage.getItem('test')
 
      this.clientService.addProductShopping(product);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se agrego el producto',
        showConfirmButton: true,
      })
    }else{

      Swal.fire({
        title: 'Necesita ingresar como cliente',
        showDenyButton: true,
   
        confirmButtonText: 'Seguir en la pagina',
        denyButtonText: `Ir al Login`,
      }).then((result) => {
         if (result.isDenied) {
          this.authService.logOut();
          this.router.navigateByUrl("auth/login")
        }
      })
    }
   

  }

}
