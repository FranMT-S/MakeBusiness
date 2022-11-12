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
                                'id', 'nameCompany', 'description', 
                                'phone','category','location',
                                'idPlan','idWeb','idUser','state'
                              ];

  companies:Company[] = [];
  selectedCompany:Company = {} as Company;
  dataSource = new MatTableDataSource<Company>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router:Router,private companyService:CompanyService) {
   }


  
  ngOnInit(): void {
    this.companies = this.companyService.getAllCompany;
   
    this.dataSource.data = this.companies ;
    this.dataSource.paginator = this.paginator;
  }

  selectRow(row:Company){
    this.selectedCompany = row;
    this.selectedRowIndex = row.id;
    // console.log(row)
  }
  
  changeStateCompany(){
      
      this.companyService.changeStateCompany(this.selectedCompany.id);
  }

}
