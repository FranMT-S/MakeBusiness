import { Component, OnInit, Renderer2,Inject} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Block, pageCompany } from 'src/app/interfaces/page';
import { CompanyService } from 'src/app/services/company.service';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  page?:pageCompany;
  blocks:Block[] = [];

  constructor(
    private activatedRoute:ActivatedRoute,
    private companyService:CompanyService,
    private _renderer2: Renderer2,
     @Inject(DOCUMENT) private _document: Document
  ) { 
    this.activatedRoute.params.subscribe((params:Params) => {
      let idPage = params['idPage']
      this.companyService.getPage(this.companyService.getCurrentIDCompany,idPage).subscribe(res =>{
        if(res.ok){
          this.page = res.page;
          this.blocks = this.page.blocks;
          
          // Agregar el script
          let script = this._renderer2.createElement('script');
          script.type = `text/javascript`;
          script.charset = 'utf-8';
          script.text = this.page.js ?? "";
          this._renderer2.appendChild(this._document.body, script);
        
          // Cargar CSS
          let style:HTMLStyleElement = this._renderer2.createElement('style');
          style.innerHTML = this.page.css ?? "";
          this._renderer2.appendChild(this._document.body, style);
        }
      })
    })

  }

  ngOnInit(): void {
  }

}
