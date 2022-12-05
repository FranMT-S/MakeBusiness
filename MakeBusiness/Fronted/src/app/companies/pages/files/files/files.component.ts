import { Component, OnInit, Input,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';


import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { fileCompany, fileSend } from 'src/app/interfaces/fileCompany';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {




  images:fileCompany[] = [];  
  videos:fileCompany[] = []; 
  filesGenerics:fileCompany[] = []; 
  file!: File | null;
  fileUpdate!:fileCompany;

  constructor(private activatedRoute:ActivatedRoute, private companyService:CompanyService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(){
    this.images = [];  
    this.videos = []; 
    this.filesGenerics = []; 
    this.companyService.getFiles(this.companyService.getCurrentIDCompany).subscribe(res => {
      
      const regexImagen = ".jpg|.png|.jpeg|.gif|.tiff|.tif|.RAW|.bmp|.pic"
    
      if(res.ok){
          res.files.forEach(file =>{
            if(file.name.match(regexImagen) != null)
              this.images.push(file);
            else if(file.name.match(".mp4") != null)
              this.videos.push(file);
            else
              this.filesGenerics.push(file);
          })
      }


    })
  }

  selectFile(event:any){
    const allow = ['image/png', 'image/jpeg', 'image/jpg']
    this.file = event?.target?.files[0];
  
  }

  open(fileForm:any) {
		this.modalService.open(fileForm)
	}

  close() {
    this.file = null;
    this.modalService.dismissAll()
	}

  save(form:NgForm){
    if(this.file && form.valid){
      const {baseName,description} = form.value;
      let file:File =  this.file;
      const fileSend:fileSend = { baseName,description,file }
      this.companyService.newFile(this.companyService.getCurrentIDCompany,fileSend).subscribe( res=>{
        if(res.ok){
          this.getFiles();
          this.modalService.dismissAll()
        }else{
          alert("Hubo un error al subir el archivo")
        }
       })   
    }
  }

  formUpdate(file:fileCompany,modal:any){
    this.fileUpdate = file;
    this.modalService.open(modal)

  }

  update(form:NgForm){

    if(form.valid){
     

      this.companyService.updateFile(this.companyService.getCurrentIDCompany,this.fileUpdate._id,form.value).subscribe( res=>{
        if(res.ok){
          this.getFiles();
          this.modalService.dismissAll()
        }else{
          alert("Hubo un error al actualizar el archivo")
        }
       })   
    }
  }
  
  
  
}
