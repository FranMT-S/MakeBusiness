import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Company } from 'src/app/interfaces/company';
import { Product } from 'src/app/interfaces/product';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

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
    
    this.companyService.getCompanyProducts(this.companyService.getCurrentIDCompany).subscribe( res =>{
      if(res.ok){
       
          this.products = res.products;
          this.dataSource.data = this.products;
          this.dataSource.paginator = this.paginator;
      }
    })
   
  }
  
  ngOnInit(): void {
 
      
  };



  selectRow(row:Product){
    this.selectedProduct = row;
    this.selectedRowIndex = row._id;


   
  }
  

  editProduct(){
    let id = this.selectedRowIndex;
    console.log(this.companyService.getCurrentProducts)
    this.router.navigateByUrl(`/companies/${this.companyService.getCompany._id}/products/${this.selectedProduct._id}/edit-product`)
 


  }
  


}
