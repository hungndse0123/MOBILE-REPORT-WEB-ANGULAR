import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(i=>i.UserModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./modules/product/product.module').then(i=>i.ProductModule)
  },
  {
    path: 'recipe',
    loadChildren: () => import('./modules/recipe/recipe.module').then(i=>i.RecipeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
