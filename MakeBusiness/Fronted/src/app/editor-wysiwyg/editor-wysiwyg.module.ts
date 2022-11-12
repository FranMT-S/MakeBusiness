import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [],
  exports: [
    HttpClientModule, 
    AngularEditorModule
  ]
})
export class EditorWYSIWYGModule { }
