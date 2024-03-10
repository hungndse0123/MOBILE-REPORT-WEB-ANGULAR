import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './pages/product/product.component';
import { CoreModule } from '../../core/core.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CoreModule,
    FormsModule
  ]
})
export class ProductModule { }
