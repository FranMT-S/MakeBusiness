
import { CommonModule } from '@angular/common';

import {NgModule} from '@angular/core';

import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';

// edit-profile
import { MatRadioModule } from '@angular/material/radio';

// pruebas botones sidenar
import { MatExpansionModule } from '@angular/material/expansion';
import { MatList, MatListModule } from '@angular/material/list';

//setting
import { MatTabsModule } from '@angular/material/tabs';

//Tablas
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollingModule } from '@angular/cdk/scrolling';
/**
 * NgModule that includes all Material modules.
*/
@NgModule({
  // providers: [
  //   {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'legacy'}}
  // ],
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    // Material
    MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  ScrollingModule,
  MatSelectModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatRadioModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatListModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatTableModule,
  MatChipsModule,
  MatPaginatorModule,
  MatSortModule,
  MatStepperModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatDialogModule,
  DragDropModule  
]
})
export class MaterialModule {}

