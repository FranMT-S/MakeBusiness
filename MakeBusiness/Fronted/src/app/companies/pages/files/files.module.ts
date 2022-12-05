import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesRoutingModule } from './files-routing.module';
import { FilesComponent } from './files/files.component';
import { GalleryComponent } from './components/gallery/gallery.component';

// Terceros
import { LightgalleryModule } from 'lightgallery/angular/13';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FilesComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
    LightgalleryModule,
    FormsModule
  ]
})
export class FilesModule { }
