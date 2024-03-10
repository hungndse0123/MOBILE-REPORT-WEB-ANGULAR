import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    RecipeComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    CoreModule,
    FormsModule
  ]
})
export class RecipeModule { }
