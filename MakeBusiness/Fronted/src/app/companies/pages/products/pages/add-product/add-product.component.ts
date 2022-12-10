import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'     

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public uploadImage!: File;
  public imageUrl:string | undefined = `${environment.baseUrl}/uploads/other/img-default.png`;


  myForm:FormGroup = this.fb.group({
    name   : ["",[Validators.required]],
    description: ["",[Validators.required]],
    price: ["",[Validators.required,this.validatorService.isNumber]],
    category: ["",[Validators.required]],
    image:["",[Validators.required]]
  });

  constructor(private fb:FormBuilder,private validatorService:ValidatorService,
              private companyService:CompanyService) { }

  ngOnInit(): void {
  }

  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  changeImage(event:any){
    const allow = ['image/png', 'image/jpeg', 'image/jpg']
    this.uploadImage = event?.target?.files[0];
    if (!this.uploadImage) {  
      this.myForm.get("image")?.markAsPristine(); 
      return; 
    }
    if(!allow.includes(this.uploadImage.type)) {
      this.myForm.get("image")?.markAsPristine();
      Swal.fire({ 
        background:'rgba(250,250,250,0.96)',
        title: 'Oops!! hubo un error',
        text: `Tipo de archivo no valido`,                  
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
       return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.uploadImage);
    reader.onload = (event) => {
     
      this.imageUrl = event.target?.result?.toString();
    }
  }


  save(){

    
  
    if(this.myForm.valid){
      
      const {name,description,price,category:categories} = this.myForm.value

      let product = {
        name,
        description,
        price,
        categories,
        image: this.uploadImage,
      }

      this.companyService.addProduct(product).subscribe(res =>{
        console.log(res)
        if(res.ok){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Agregado con exito',
            showConfirmButton: true,
          }).then(()=>{
            this.myForm.reset()
            this.imageUrl = `${environment.baseUrl}/uploads/other/img-default.png`;
          })
         
        }else{
         
          Swal.fire({ 
            background:'rgba(250,250,250,0.96)',
            title: 'Oops!! hubo un error',
            text: `${res.msg}`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
          console.log(res.error)
        }
      })
    }else{
     
      Swal.fire({ 
        background:'rgba(250,250,250,0.96)',
        title: 'Oops!! hubo un error',
        text: `Ingrese los datos correctos`,                  
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }

  
  }

}
