import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';

import { CompanyService } from 'src/app/services/company.service';




@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.scss']
})
export class ListCompaniesComponent implements OnInit {
  
  selectedRowIndex = "";
  
  
  displayedColumns: string[] = [
                                '_id', 'nameCompany', 'description', 
                                'phone','category','location',
                                'state'
                              ];

  companies:Company[] = [];
  selectedCompany:Company = {} as Company;
  dataSource = new MatTableDataSource<Company>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router:Router,private companyService:CompanyService) {
   }


  
  ngOnInit(): void {
 
   this.companyService.getAllCompany.subscribe( res => {
      if(res.ok){
  
        this.companies = res.companies;
        this.dataSource.data = this.companies ;
        this.dataSource.paginator = this.paginator;
      }
   });
   
   
  }

  selectRow(row:Company){
    this.selectedCompany = row;
    this.selectedRowIndex = row._id;

  }
  
  changeStateCompany(company:Company){
      
      this.companyService.changeStateCompany(company).subscribe( res =>{
        if(!res.ok){
          alert("No cambiar el estado")
        }      
      });
  }

  deleteCompany(){
      
    if (confirm("Desea eliminar la empresa " + this.selectedCompany.nameCompany)) {
     
      this.companyService.deleteCompany(this.selectedCompany).subscribe( res =>{
        if(res.ok){
          this.dataSource.data = this.dataSource.data.filter( company => company._id != this.selectedCompany._id)
        }else{
          alert("no se pudo eliminar la empresa")
          console.log(res.error)
        }
      });
    } 
  }

}
