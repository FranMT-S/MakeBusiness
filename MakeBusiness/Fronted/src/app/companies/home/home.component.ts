import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { param } from 'lightgallery/plugins/video/lg-video-utils';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  optionButtons = [
    {
      text:"Administrar Archivos",
      path:"files",
      icon:"fa fa-solid fa-file ps-2"
    },
    {
      text:"Productos",
      path:"products",
      icon:"fa fa-solid fa-users"
    },
    {
      text:"Administrar Páginas",
      path:"pages",
      icon:"fa fa-solid fa-money-bill-transfer"
    },
    {
      text:"Config. del Sitio",
      path:"web-config",
      icon:"fa fa-solid fa-pen-to-square"
    },

    ]
  constructor(private companyService: CompanyService, private activatedRoute:ActivatedRoute) { 


     this.activatedRoute.params.subscribe( (params:Params) => {
   
      this.companyService.setCurrentIDCompany =   params['id'];
      this.companyService.inicializatedCurrentData(params['id'])
    })

  }

  ngOnInit(): void {
   

  }

  ngAfterContentInit(): void {

  }

}
