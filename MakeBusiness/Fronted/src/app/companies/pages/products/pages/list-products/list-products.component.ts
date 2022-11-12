import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { Product } from 'src/app/interfaces/product';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  selectedRowIndex = "";
  selectedProduct:Product = {} as Product;
  
  displayedColumns: string[] = [
                                'id', 'name', 'price', 
                                'description','score','counterVotes',
                                'categories',
                              ];


  products:Product[] = [];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router:Router,private companyService:CompanyService,private activatedRoute:ActivatedRoute) {
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    
    this.products = this.companyService.getCompanyProducts(this.companyService.getCompany.id);
    this.dataSource.data = this.products;
  
  }

  selectRow(row:Product){
    this.selectedProduct = row;
    this.selectedRowIndex = row.id;


   
  }
  

  editProduct(){
    let id = this.selectedRowIndex;
    console.log(this.companyService.getCurrentProducts)
    this.router.navigateByUrl(`/companies/${this.companyService.getCompany.id}/products/${this.selectedProduct.id}/edit-product`)
 


  }
  


}
