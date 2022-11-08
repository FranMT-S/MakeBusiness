import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { url } from 'inspector';
import { Block, TemplateRaw } from 'src/app/interfaces/page';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-edit-code',
  templateUrl: './edit-code.component.html',
  styleUrls: ['./edit-code.component.scss']
})
export class EditCodeComponent implements OnInit {
  //  cambiar favicon
  // favIcon: HTMLLinkElement | null  = document.querySelector('#favIcon');

  htmlContent:any;
  template:TemplateRaw = {} as TemplateRaw;

  constructor(private activatedRoute:ActivatedRoute,private templateService:TemplateService) {
    
   }

  ngOnInit(): void {
    // cambiar favicon
  //  this.favIcon!.href = '../../../../../../../../assets/Template/favicon.png';
    this.activatedRoute.params.subscribe((params:Params) => {
      let data = this.templateService.getTemplate(params['id']);
      if(data != undefined)   
        this.template = data; 
    })
  }
  

  ngAfterViewInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    // for(let block of this.template.blocks){
    //   let blockContainer = document.getElementById("block-" + block.id) as HTMLDivElement;
    //   this.writeHTML(block.id);
    // }
  }

  test(test:any){
    console.log(test);
  }

  writeHTML(id:string){
      let blockContainer = document.getElementById("block-" + id) as HTMLDivElement;
      let block:Block | undefined = this.template.blocks.find(e => e.id = id);
      if(block != null){
        blockContainer.innerHTML = block.HTML;
        return block.HTML
      }
      return ""
  }
}
