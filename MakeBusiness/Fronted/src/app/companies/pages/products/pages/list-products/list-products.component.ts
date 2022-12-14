import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Company } from 'src/app/interfaces/company';
import { Product } from 'src/app/interfaces/product';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'     

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  selectedRowIndex = "";
  selectedProduct:Product = {} as Product;
  
  productURLBase = `${environment.baseUrl}/uploads/products/` 
  displayedColumns: string[] = [
                                'id', 'name', 'price', 
                                'description',
                                'categories', "image"
                              ];


  products:Product[] = [];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router:Router,private companyService:CompanyService,private activatedRoute:ActivatedRoute) {
   }



   ngAfterViewInit() {
    
    this.getProducts();
   
  }
  
  ngOnInit(): void {
 
      
  };

  getProducts(){
    this.companyService.getCompanyProducts(this.companyService.getCurrentIDCompany).subscribe( res =>{
      if(res.ok){
       
          this.products = res.products;
          this.dataSource.data = this.products;
          this.dataSource.paginator = this.paginator;
      }
    })
  }

  selectRow(row:Product){
    this.selectedProduct = row;
    this.selectedRowIndex = row._id;


   
  }
  

  editProduct(){
    let id = this.selectedRowIndex;
    this.router.navigateByUrl(`/admin-companies/${this.companyService.getCurrentIDCompany}/products/${id}/edit-product`)
  }

  deleteProduct(){
    let id = this.selectedRowIndex;
   

    Swal.fire({

      text: "??Desea eliminar esta producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteProduct(id).subscribe(res =>{
          if(res.ok){
            this.getProducts();
          }else{  
            Swal.fire({ 
              background:'rgba(250,250,250,0.96)',
              title: 'Oops!! hubo un error',
              text: `no se pudo eliminar`,                  
              icon: 'error',
              confirmButtonColor: '#3085d6'
            });
            console.log(res.error)
          }
        })
      }
    })
 
  }
  


}
