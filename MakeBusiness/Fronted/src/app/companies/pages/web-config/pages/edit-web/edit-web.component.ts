import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { webCompany } from 'src/app/interfaces/web';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-web',
  templateUrl: './edit-web.component.html',
  styleUrls: ['./edit-web.component.scss']
})
export class EditWebComponent implements OnInit {
  
  web:webCompany = {} as webCompany;

  public favicon!: File | null;
  public logo!: File | null;
  public faviconURL:string | undefined = "";
  public logoURL:string | undefined = "";
  

  buttons = [{"text":'Editar Encabezado', "name":"header"},
              {"text":'Editar Pie de pagina', "name":"footer"},
              {"text":'Editar CSS', "name":"css"},
              {"text":'Editar JS', "name":"js"},
      ]

    myForm:FormGroup = this.fb.group({
    title   : [,[Validators.required]],
    description: [,[Validators.required]],
    keywords: [,[Validators.required]],
  });
   


  constructor(private companyService:CompanyService,private fb:FormBuilder) { }

  ngOnInit(): void {
   
    
    this.companyService.getWeb(this.companyService.getCurrentIDCompany).subscribe( res=>{
      if(res.ok){
        this.web = res.web;
        this.faviconURL = `${environment.baseUrl}/uploads/web/${this.web.favicon}`
        this.logoURL = `${environment.baseUrl}/uploads/web/${this.web.logo}`
        this.myForm.setValue({
          title   :  this.web.title,
          description: this.web.description,
          keywords: this.web.keywords
        })
      }
    });
 
  }

  test(){
    console.log("test")
  }

  changeFavicon(event:any){
    const allow = ['image/png', 'image/jpeg', 'image/jpg']
    this.favicon = event?.target?.files[0];
    if (!this.favicon) {  
      this.myForm.get("image")?.markAsPristine(); 
      return; 
    }
    if(!allow.includes(this.favicon.type)) {
      this.myForm.get("image")?.markAsPristine();
       alert("tipo de archivo no valido");
       return;
    }
    const reader = new FileReader();
 
    reader.readAsDataURL(this.favicon);  
    reader.onload = (event) => {   
      this.faviconURL = event.target?.result?.toString();
    }
  }

  changeLogo(event:any){
    const allow = ['image/png', 'image/jpeg', 'image/jpg']
    this.logo = event?.target?.files[0];
    if (!this.logo) {  
      this.myForm.get("image")?.markAsPristine(); 
      return; 
    }
    if(!allow.includes(this.logo.type)) {
      this.myForm.get("image")?.markAsPristine();
       alert("tipo de archivo no valido");
       return;
    }
    const reader = new FileReader();
 
    reader.readAsDataURL(this.logo);  
    reader.onload = (event) => {   
      this.logoURL = event.target?.result?.toString();
    }
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){

    if(this.myForm.valid){
      
      const {title,description,keywords} = this.myForm.value
      let logo = this.logo;
      let favicon = this.favicon;

      let web = {
        title,
        description,
        keywords,
        logo,
        favicon,
      }

      this.companyService.updateWeb(this.companyService.getCurrentIDCompany,web).subscribe(res =>{
        console.log(res)
        if(res.ok){
          alert("Modificado con exito con exito")
         
       
        }else{
          alert(res.msg)
          console.log(res.error)
        }
      })
    }else{
      console.log(this.myForm.valid)
      console.log(this.myForm.value)
      alert("Ingrese los datos correctos")
    }
  }
}
