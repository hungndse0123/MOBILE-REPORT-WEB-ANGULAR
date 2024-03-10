import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuList: any = [
    {
      path: '/user',
      title: 'User'
    },
    {
      path: '/product',
      title: 'Product'
    },
    {
      path: '/recipe',
      title: 'Recipe'
    },
  ]
  constructor(
    private router: Router
  ) {}

  navigateTo(item: any) {
    if(item.path.includes('https')) {
      window.open(item.path)
    } else {
      this.router.navigate([item.path])
    }
  }
}
