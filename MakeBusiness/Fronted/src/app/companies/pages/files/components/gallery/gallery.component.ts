import { Component, Input, OnInit } from '@angular/core';
import { fileCompany } from 'src/app/interfaces/fileCompany';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() files:fileCompany[] = [];
  @Input() type:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  iconGeneric(name:string){
    let extension:string = name.match(/\.[0-9a-z]+$/i)?.shift() ?? "";
    switch(extension){
      case ".pdf":
        return "fa-file-pdf";
        break;
      case ".xlsx":
        return "fa-file-excel";
        break;
      case ".docx":
        return "fa-file-word";
        break;
      default:
        return "fa-file"
        break;
    }
  }

  editFile(file:fileCompany){
    console.log(file)
  }
}
