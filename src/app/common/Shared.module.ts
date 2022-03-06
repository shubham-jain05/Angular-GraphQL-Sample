import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './componsnts/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PageNotFoundComponent
  ]
})
export class SharedModule { }
