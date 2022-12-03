import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: string): string {
    let word:string = value;
    
    value = value.toLowerCase();
    switch(value){

      case "description":{
        word = "Descripción ";
        break;
      }
      case "name":{
        word = "Nombre";
        break;
      }
      case "score":{
        word = "Nombre";
        break;
      }
      case "countervotes":{
        word = "Cantidad De Votos";
        break;
      }
      case "price":{
        word = "Precio";
        break;
      }
      case "phone":{
        word = "Teléfono";
        break;
      }
      case "location":{
        word = "Localización";
        break;
      }
      case "state":{
        word = "Estado";
        break;
      }
      case "namecompany":{
        word = "Nombre";
        break;
      }
      case "categories":{
        word = "Categorías";
        break;
      }
      case "category":{
        word = "Categoría";
        break;
      }
      case "quantity":{
        word = "Cantidad";
        break;
      }
      case "date":{
        word = "Fecha";
        break;
      }
      case "_id":{
        word = "ID";
        break;
      }
      case "annuity":{
        word = "Anualidad";
        break;
      }
      case "limitpages":{
        word = "Limite de paginas";
        break;
      }
      case "limitproducts":{
        word = "Limite de productos";
        break;
      }
      case "limitfiles":{
        word = "Limite de archivos";
        break;
      }
    }    
     return word;
  }

}
