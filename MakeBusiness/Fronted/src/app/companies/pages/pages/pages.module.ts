import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages-component/pages.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { EditorWYSIWYGModule } from 'src/app/editor-wysiwyg/editor-wysiwyg.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



// import {HighlightModule,HIGHLIGHT_OPTIONS,HighlightOptions,} from 'ngx-highlightjs';

@NgModule({
  declarations: [
    PagesComponent,
    EditPageComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    MaterialModule,
    EditorWYSIWYGModule,
    PipesModule,
    // HighlightModule
  ],
  providers:[
    // {
    //   provide: HIGHLIGHT_OPTIONS,
    //   useValue: {
    //     fullLibraryLoader: () => import('highlight.js'),
    //     coreLibraryLoader: () => import('highlight.js/lib/core'),
    //     languages: {
    //       typescript: () => import('highlight.js/lib/languages/typescript'),
    //       css: () => import('highlight.js/lib/languages/css'),
    //       xml: () => import('highlight.js/lib/languages/xml')
    //     },

    //   }
      
    // }
  ]
})
export class PagesModule { }
