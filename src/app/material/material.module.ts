import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,    
    Material.MatMenuModule,
    Material.MatButtonModule,
    Material.MatInputModule,
    Material.MatIconModule,
    Material.MatFormFieldModule,
    Material.MatGridListModule,
    Material.MatSelectModule,


  ],
  exports : [
    Material.MatToolbarModule,
    Material.MatMenuModule,
    Material.MatButtonModule,
    Material.MatInputModule,
    Material.MatIconModule,
    Material.MatFormFieldModule,
    Material.MatGridListModule,
    Material.MatSelectModule,

  ]
})
export class MaterialModule { }
