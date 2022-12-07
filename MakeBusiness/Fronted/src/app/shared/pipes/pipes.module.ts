import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { SafeHtmlPipe } from './html-decoder.pipe';



@NgModule({
  declarations: [
    TranslatePipe,  
    SafeHtmlPipe
  ],
  exports:[
    TranslatePipe,
    SafeHtmlPipe
  ]
})
export class PipesModule { }
