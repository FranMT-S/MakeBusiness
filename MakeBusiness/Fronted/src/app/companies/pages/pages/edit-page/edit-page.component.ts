import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { detectOverflow } from '@popperjs/core';


import { editorConfig } from 'src/app/editor-wysiwyg/config-wysiwyg';
import { Block, pageCompany, TemplateRaw } from 'src/app/interfaces/page';
import { CompanyService } from 'src/app/services/company.service';


// import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
// const themeGithub: string = 'node_modules/highlight.js/styles/github.css';
// const themeAndroidStudio: string = 'node_modules/highlight.js/styles/androidstudio.css';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {


  editing = false;

  // Configuraciones Paginas
  pageSelected?:pageCompany;
  pages:pageCompany[] = [];
  border = true;

  // Configuraciones Bloques
  blocks:Block[] = [];
  blockSelected?:Block;
  htmlContent:string = ''
  checked = true;
  pureActive = -1;   // pureActive -1=oculto, 0=dynamico, 1= puro 
  HtmlVisual:boolean = true;   // para visualizar el html
  borderEditing = true;

  // ViewChild
  @ViewChild('editor') editor = HTMLElement;
  @ViewChild('formNewBlock') formNewBlock!:NgForm;
 



  editorConfig:AngularEditorConfig = editorConfig;



  // /*highlight*/
  // response!: HighlightAutoResult;

  //   code = `.h1{
  //     color:black;
  //   }
  // ;`

  // currentTheme: string = themeGithub;

  constructor(private activatedRoute:ActivatedRoute,
              private companyService:CompanyService, private modalService: NgbModal) { 
    
    this.activatedRoute.params.subscribe((params:Params) => {
      let id = params['id']   
      this.companyService.setCurrentIDCompany =  id ;
      this.getPages();
    })

  }



  ngOnInit(): void {


  }

  onMouseEnterEditing(block:Block) {
    this.blockSelected = block;
    this.htmlContent = block.HTML;
  }

  getPages(){
    this.companyService.getPages(this.companyService.getCurrentIDCompany).subscribe(res =>{
      if(res.ok){
        this.pages = res.pages
        if(this.pages.length > 0){
          this.pageSelected = this.pages[0]; 
          this.blocks = this.pageSelected!.blocks.map(block => {block.editing = false; return block} )
     
        }
      }
    })
  }
  

  edit(block:Block){
    let html = document.getElementById("toggleEditorMode-");
    this.editing = true;
    this.blockSelected = block;

    if(this.blockSelected.type == "dynamic")
      this.pureActive = 0;
    else
      this.pureActive = 1

  }

  onChange(newValue:pageCompany) {
    this.pageSelected = newValue;
    this.blocks = this.pageSelected?.blocks ?? []

  }
  
  open(fileForm:any) {
		this.modalService.open(fileForm) 
	}

  openFullScreen(fileForm:any){
    this.modalService.open(fileForm,{ fullscreen: true })

  }

  validateSize(form:NgForm){
      return form?.controls['size']?.valid; 
  }

  newPage(form:NgForm){
    if(form.valid){
      const page:pageCompany = form.value
    
      this.companyService.newPage(this.companyService.getCurrentIDCompany,page).subscribe( res =>{
  
        if(res.ok){
          this.getPages();
          this.modalService.dismissAll()
        }

      })
    }
  }


  deletePage(){
    if(window.confirm('desea eliminar la pagina?')){
      this.companyService.deletePage(this.companyService.getCurrentIDCompany,this.pageSelected!._id).subscribe( res =>{
          if(res.ok){
            if(res.ok){
              console.log("eliminado con exito")
              this.getPages();
            }
          }
      })
    }   
  }

  
  
  newBlock(form:NgForm){
    if(form.valid){
      const block:Block = form.value
      
      this.companyService.newBlock(this.companyService.getCurrentIDCompany,this.pageSelected!._id,block).subscribe( res =>{
        if(res.ok){
          this.getPages();
          this.modalService.dismissAll()
        }
      })
    }
  }

  getBlocks(){
    this.companyService.getBlocks(this.companyService.getCurrentIDCompany,this.pageSelected!._id).subscribe(res =>{
      if(res.ok) this.blocks = res.blocks
    })
  }

  editBlock(form:NgForm){
    
    if(form.valid){
      const {size,HTML} = form.value
      const block:Block = { 
                            size ,
                            HTML,
                            _id:this.blockSelected!._id, 
                            position:this.blockSelected!.position,
                             type:this.blockSelected!.type
                          }
     
      this.companyService.updateBlock(this.companyService.getCurrentIDCompany,this.pageSelected!._id,block).subscribe( res =>{
        if(res.ok){
          if(res.ok){
            alert("actualizado con exito");
            this.getBlocks();
                this.modalService.dismissAll()
          }else{
            alert("no se pudo actualizar")
          }
        }
     })
    }
  }

  deleteBlock(block:Block){
    if(window.confirm('desea eliminar la pagina?')){
      this.companyService.deleteBlock(this.companyService.getCurrentIDCompany,this.pageSelected!._id,block._id).subscribe( res =>{
          if(res.ok){
            if(res.ok){
              console.log("eliminado con exito");
              this.getBlocks();
            
            }
          }
      })
    }  
  }

  // // Highlight

  // onHighlight(e: HighlightAutoResult) {
  //   this.response = {
  //     language: e.language,
  //     relevance: e.relevance,
  //     secondBest: '{...}',
  //     value: '{...}',
  //   };
  // }

  // changeTheme() {
  //   this.currentTheme = this.currentTheme === themeGithub ? themeAndroidStudio : themeGithub;
  //   this.hljsLoader.setTheme(this.currentTheme);
  // }

  // //

}
