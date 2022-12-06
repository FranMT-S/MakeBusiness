import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { editorConfig } from 'src/app/editor-wysiwyg/config-wysiwyg';
import { Block, TemplateRaw } from 'src/app/interfaces/page';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  htmlContent = ''
  button = "<button>text</button>"
  editing = false;
  blockSelected:Block = {} as Block;
  border = true;
  checked = true;
  // pureActive -1=oculto, 0=dynamico, 1= puro 
  pureActive = -1; 
  @ViewChild('editor') editor = HTMLElement;

  editorConfig:AngularEditorConfig = editorConfig;
  template:TemplateRaw = {} as TemplateRaw;


  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
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
