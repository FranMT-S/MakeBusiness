import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesComponent } from './files/files.component';
import { GalleryComponent } from './components/gallery/gallery.component';


@NgModule({
  declarations: [
    FilesComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule
  ]
})
export class FilesModule { }
