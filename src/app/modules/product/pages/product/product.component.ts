import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductService } from '../../../../data/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  productList: any;
  selectedProductCondition: string = '';
  minPriceCondition: number = 0;
  dropdownList: any = [];
  myChart: any;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe((res: any) => {
      this.dropdownList = res;
    });
    this.productService.getAllProduct().subscribe((res: any) => {
      this.productList = res;
      this.loadData(res);
    });
    Chart.register(...registerables);
    this.myChart = new Chart("Product",  {
      type: 'pie',
      data: {
        labels: [
          'Below 1',
          'Between 1 and 2',
          'Between 2 and 3',
          'Between 3 and 4',
          'Between 4 and 5',
        ],
        datasets: [{
          label: 'Rating',
          data: [0,0,0,0,0],
          backgroundColor: [
            'red',
            'blue',
            'yellow',
            'green',
            'black'
          ],
          hoverOffset: 4
        }]
      },
      options: {
      }
    });
  }

  onSelectedCategoryConditionChange(event: any) {
    this.selectedProductCondition = event;
    this.loadData(this.productList);
  }

  onMinPriceConditionChange(event: any) {
    this.minPriceCondition = event;
    this.loadData(this.productList);
  }

  loadData(data: any) {  
    let filteredData = data.products?.filter((x: any) => ((this.minPriceCondition ? x.price >= this.minPriceCondition : true) 
    && (this.selectedProductCondition != '' ? x.category == this.selectedProductCondition : true))); 
    this.myChart.data.datasets[0].data = [filteredData?.filter((x: any) => x.rating < 1).length,
      filteredData?.filter((x: any) => x.rating >= 1 && x.rating <= 2).length,
      filteredData?.filter((x: any) => x.rating > 2 && x.rating <= 3).length,
      filteredData?.filter((x: any) => x.rating > 3 && x.rating <= 4).length,
      filteredData?.filter((x: any) => x.rating > 4 && x.rating <= 5).length ];
    this.myChart.update();
  }
}
