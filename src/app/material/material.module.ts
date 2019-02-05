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
    Material.MatIconModule

  ],
  exports : [
    Material.MatToolbarModule,
    Material.MatMenuModule,
    Material.MatButtonModule,
    Material.MatInputModule,
    Material.MatInputModule,
    Material.MatIconModule
  ]
})
export class MaterialModule { }
