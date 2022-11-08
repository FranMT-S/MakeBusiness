import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

 

   
  constructor(private activatedRoute:ActivatedRoute, private companyService:CompanyService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params) => {
      
  
    } )
  }

}
