import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';
import { fileCompany } from 'src/app/interfaces/fileCompany';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'     

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() files:fileCompany[] = [];
  @Input() type:string = "";
  @Output() onEditFile:EventEmitter<fileCompany> =  new EventEmitter();;
  
  url:string = `${environment.baseUrl}/uploads/files/`
  
  constructor(private companyService:CompanyService) { }


  ngOnInit(): void {
  }

  iconGeneric(name:string){
    let extension:string = name.match(/\.[0-9a-z]+$/i)?.shift() ?? "";
    switch(extension){
      case ".pdf":
        return "fa-file-pdf text-warning";
        break;
      case ".xlsx":
        return "fa-file-excel text-success";
        break;

      case ".ppt":
      case ".pptx":
        return "fa-file-powerpoint text-danger";
        break;
      case ".docx":
        return "fa-file-word text-primary";
        break;
      case ".mp3":
        return "fa-file-audio text-purple";
        break;
      case ".zip":
      case ".rar":
        return "fa-file-archive text-purple";
        break;
      default:
        return "fa-file-lines text-purple"
        break;
    }
  }

  editFile(file:fileCompany){
    this.onEditFile.emit(file)
  }

  deleteFile(file:fileCompany){

    Swal.fire({

      text: "¿Desea eliminar este archivo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteFile(this.companyService.getCurrentIDCompany,file._id).subscribe(res =>{
          if(res.ok){
            this.files =  this.files.filter(f => f._id != file._id )
          }else{
            Swal.fire({ 
              background:'rgba(250,250,250,0.96)',
              title: 'Oops!! no se pudo eliminar',
              text: `${res.msg}`,                  
              icon: 'error',
              confirmButtonColor: '#3085d6'
            });
          }
        })
      }
    })


  }
}
