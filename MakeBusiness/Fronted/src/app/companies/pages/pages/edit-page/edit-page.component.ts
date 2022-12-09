import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';

import { editorConfig } from 'src/app/editor-wysiwyg/config-wysiwyg';
import { Block, pageCompany, TemplateRaw } from 'src/app/interfaces/page';
import { WebWithPage } from 'src/app/interfaces/web';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'

// import { HighlightLoader, HighlightAutoResult } from 'ngx-highlightjs';
// const themeGithub: string = 'node_modules/highlight.js/styles/github.css';
// const themeAndroidStudio: string = 'node_modules/highlight.js/styles/androidstudio.css';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  favIcon: HTMLLinkElement | null = document.querySelector('#favIcon'); 

  editing = false;

  // Configuraciones Paginas
  web?:WebWithPage;
  pageSelected?:pageCompany;
  pageMain?:pageCompany;
  
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

  constructor(private activatedRoute:ActivatedRoute, private router:Router,
              private companyService:CompanyService, private modalService: NgbModal,
              private _renderer2: Renderer2,
               @Inject(DOCUMENT) private _document: Document
              ) { 
    
    // Cargar Script
    let script = this._renderer2.createElement('script');
    this._renderer2.setAttribute(script,'id','newScript');
    this._renderer2.appendChild(this._document.body, script);
              
    // Cargar CSS
    let style:HTMLStyleElement = this._renderer2.createElement('style');
    this._renderer2.setAttribute(style,'id','newCSS');
    this._renderer2.appendChild(this._document.body, style);

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



    if(this.blockSelected.type == "dynamic")
      this.pureActive = 0;
    else
      this.pureActive = 1
  }

  getPages(){
    this.companyService.getWebWithPages(this.companyService.getCurrentIDCompany).subscribe(res =>{
      if(res.ok){

        this.pages = res.web.pages;
        this.web = res.web;
        this.favIcon!.href = `${environment.baseUrl}/uploads/web/${this.web!.favicon}` 

        this.pageMain = this.web.pages.find(page => page._id == this.web?.pageMain);
        if(this.pages.length > 0){
          this.pageSelected ??= this.pages[0]; 
          this.blocks = this.pageSelected!.blocks.map(block => {block.editing = false; return block} )
          this.loadJsAndCSS();
        }
      }
    })
  }
  

  edit(block:Block){


  }

  onChange(newValue:pageCompany) {
    this.pageSelected = newValue;
    this.blocks = this.pageSelected?.blocks ?? []
    console.log("paso")
    this.loadJsAndCSS();
  }


  onChangePageMain(newValue:pageCompany) {
    this.pageMain = newValue;
    this.companyService.updateMainPage(this.companyService.getCurrentIDCompany,newValue._id).subscribe(res =>{
      if(!res.ok){
        Swal.fire({ 
            background:'rgba(250,250,250,0.96)',
            title: 'Oops!!',
            text: `No se pudo actualizar`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
        });     
      }
    });
  }
  
  open(fileForm:any) {
		this.modalService.open(fileForm) 
	}
  openNewPage(fileForm:any) {
    if(this.pages.length < 5)
      this.modalService.open(fileForm) 
    else
      Swal.fire({ background:'rgba(250,250,250,0.96)',
            title: 'Oops!!',
            text: `Limite 5 paginas`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
    });
    
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
    if(this.pages.length <= 1){    
      Swal.fire({ background:'rgba(250,250,250,0.96)',
          title: 'Oops!!',
          text: `Necesita al menos 1 pagina`,                  
          icon: 'error',
          confirmButtonColor: '#3085d6'
      });
    }else{
        Swal.fire({
          title: 'No hay una pagina principal',
          text: "¿Desea eliminar esta pagina?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: "No"
        }).then((result) => {
          if (result.isConfirmed) {
            this.companyService.deletePage(this.companyService.getCurrentIDCompany,this.pageSelected!._id).subscribe( res =>{
              if(res.ok){ 
                  this.getPages();              
              }
            })
          }
        })  
    }
  }
  
  
  newBlock(form:NgForm){
    
    if(this.pages.length < 5)
      if(form.valid){
        const block:Block = form.value
        
        this.companyService.newBlock(this.companyService.getCurrentIDCompany,this.pageSelected!._id,block).subscribe( res =>{
          if(res.ok){  
            this.blocks.push(res.block)
            this.modalService.dismissAll()
            
          }
        })
      }
    else
      Swal.fire({ background:'rgba(250,250,250,0.96)',
            title: 'Oops!!',
            text: `Limite 5 paginas`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
    });


  }

  getBlocks(){
    this.companyService.getBlocks(this.companyService.getCurrentIDCompany,this.pageSelected!._id).subscribe(res =>{
      if(res.ok) this.blocks = res.blocks
    })
  }

  editPage(form:NgForm){
    if(form.valid){
      this.companyService.updatePage(this.companyService.getCurrentIDCompany,this.pageSelected!._id, form.value).subscribe( res =>{

          if(res.ok){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cambios Exitosos',
              showConfirmButton: true,
            }).then( result =>{
         
              this.pageSelected = res.page;
              this.modalService.dismissAll()
            })
         
          
        }else{
          Swal.fire({ 
            background:'rgba(250,250,250,0.96)',
            title: 'Oops!!',
            text: `No se pudo actualizar`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
        }); 
        }
      })
    }
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
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cambios Exitosos',
              showConfirmButton: true,
            }).then( result =>{
              this.modalService.dismissAll()
            })
         
            this.blocks = res.blocks;
            
          }else{
            Swal.fire({ 
              background:'rgba(250,250,250,0.96)',
              title: 'Oops!!',
              text: `No se pudo actualizar`,                  
              icon: 'error',
              confirmButtonColor: '#3085d6'
          }); 
          }
        }
     })
    }
  }

  deleteBlock(block:Block){

    Swal.fire({
      title: 'No hay una pagina principal',
      text: "desea eliminar el bloque?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteBlock(this.companyService.getCurrentIDCompany,this.pageSelected!._id,block._id).subscribe( res =>{
          if(res.ok){
            if(res.ok){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Eliminado con Exitoso',
                showConfirmButton: true,
              }).then( result =>{
                this.modalService.dismissAll()
              })
              this.blocks = res.blocks;      
            }else{
              Swal.fire({ 
                background:'rgba(250,250,250,0.96)',
                title: 'Oops!!',
                text: `Hubo un error`,                  
                icon: 'error',
                confirmButtonColor: '#3085d6'
            }); 
            }
          }
      })
      }
    }) 

  }

  back(){
    if(!this.pageMain){
      Swal.fire({
        title: 'No hay una pagina principal',
        text: "¿Desea salir sin selecionar pagina principal?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, salir'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl(`admin-companies/${localStorage.getItem("_web")}`)
        }
      })
    }else{
      this.router.navigateByUrl(`admin-companies/${localStorage.getItem("_web")}`)
    }
  }

  loadJsAndCSS(){
    // Agregar el script
    let script = this._renderer2.selectRootElement('#newScript',false) ?? this._renderer2.createElement('script');
    this._renderer2.setAttribute(script,'id','newScript');
    script.type = `text/javascript`;
    script.charset = 'utf-8';
    script.text = this.pageSelected?.js ?? "";
    this._renderer2.appendChild(this._document.body, script);
  
    // Cargar CSS
    let style:HTMLStyleElement =  this._renderer2.selectRootElement('#newCSS',false) ?? this._renderer2.createElement('style');
    style.innerHTML = this.pageSelected?.css ?? "";
    this._renderer2.appendChild(this._document.body, style);
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
