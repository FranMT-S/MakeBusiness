import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { AvatarComponent } from './avatar.component';




@NgModule({
  declarations: [AvatarComponent],
  exports:[AvatarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AvatarModule { }
