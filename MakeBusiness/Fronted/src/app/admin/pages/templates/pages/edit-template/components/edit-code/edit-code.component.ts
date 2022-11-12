import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { url } from 'inspector';
import { Block, TemplateRaw } from 'src/app/interfaces/page';
import { TemplateService } from 'src/app/services/template.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-edit-code',
  templateUrl: './edit-code.component.html',
  styleUrls: ['./edit-code.component.scss']
})

export class EditCodeComponent implements OnInit {
  //  cambiar favicon
  // favIcon: HTMLLinkElement | null  = document.querySelector('#favIcon');

  htmlContent = ''
  button = "<button>text</button>"
  editing = false;
  blockSelected:Block = {} as Block;
  border = true;
  checked = true;
  // pureActive -1=oculto, 0=dynamico, 1= puro 
  pureActive = -1; 
  @ViewChild('editor') editor = HTMLElement;


    
  editorConfig:AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    maxHeight: '250px',
    width: 'auto',
    minWidth: '0',
    enableToolbar: true,
    showToolbar: true,

      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
    ]
};




  template:TemplateRaw = {} as TemplateRaw;

  constructor(private activatedRoute:ActivatedRoute,private templateService:TemplateService,
              public dialog: MatDialog,private _overlay: Overlay, private _viewContainerRef: ViewContainerRef) {

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
    // let div = document.getElementById("block-1");
    // div!.innerHTML = this.button
  }



  edit(block:Block){
    let html = document.getElementById("toggleEditorMode-");
    this.editing = true;
    this.blockSelected = block;

    if(this.blockSelected.type == "dynamic")
      this.pureActive = 0;
    else
      this.pureActive = 1
    
      console.log(this.pureActive)
    console.log(block);
  }

  



  openDialog() {

  }

}


// editorConfig:AngularEditorConfig = {
//   editable: true,
//   spellcheck: true,
//   height: '15rem',
//   minHeight: '5rem',
//   placeholder: 'Enter text here...',
//   translate: 'no',
//   defaultParagraphSeparator: 'p',
//   defaultFontName: 'Arial',
   

//   maxHeight: 'auto',
//   width: 'auto',
//   minWidth: '0',
//   enableToolbar: true,
//   showToolbar: true,

//     defaultFontSize: '',
//     fonts: [
//       {class: 'arial', name: 'Arial'},
//       {class: 'times-new-roman', name: 'Times New Roman'},
//       {class: 'calibri', name: 'Calibri'},
//       {class: 'comic-sans-ms', name: 'Comic Sans MS'}
//     ],
//     customClasses: [
//     {
//       name: 'quote',
//       class: 'quote',
//     },
//     {
//       name: 'redText',
//       class: 'redText'
//     },
//     {
//       name: 'titleText',
//       class: 'titleText',
//       tag: 'h1',
//     },
//   ],
//   uploadUrl: 'v1/image',
//   upload: (file: File) => {},
//   uploadWithCredentials: false,
//   sanitize: true,
//   toolbarPosition: 'top',
//   toolbarHiddenButtons: [
//     ['bold', 'italic'],
//     ['fontSize']
//   ]
// };