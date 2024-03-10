import { Component } from '@angular/core';
import { RecipeService } from '../../../../data/services/recipe/recipe.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  recipeList: any;
  selectedRecipeCondition: string = '';
  minCaloriesCondition: number = 0;
  dropdownList: any = [];
  myChart: any;

  constructor(
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
    this.recipeService.getAllTags().subscribe((res: any) => {
      this.dropdownList = res;
    });
    this.recipeService.getAllRecipe().subscribe((res: any) => {
      this.recipeList = res;
      this.loadData(res);
    });
    Chart.register(...registerables);
    this.myChart = new Chart("Recipe", {
      type: 'bar',
      data: {
        labels: [
          'Easy',
          'Medium',
          'Hard'
        ],
        datasets: [{
          label: '# of Recipes',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)'
          ],
        }]
      },
      options: {
      }
    });
  }

  onSelectedTagConditionChange(event: any) {
    this.selectedRecipeCondition = event;
    this.loadData(this.recipeList);
  }

  onMinCaloriesConditionChange(event: any) {
    this.minCaloriesCondition = event;
    this.loadData(this.recipeList);
  }

  loadData(data: any) {
    let filteredData = data.recipes?.filter((x: any) => (this.selectedRecipeCondition != '' ? x.tags.includes(this.selectedRecipeCondition) : true)
    && (this.minCaloriesCondition ? x.caloriesPerServing >= this.minCaloriesCondition : true));;
    this.myChart.data.datasets[0].data = [filteredData?.filter((x: any) => x.difficulty == "Easy").length,
    filteredData?.filter((x: any) => x.difficulty == "Medium").length,
    filteredData?.filter((x: any) => x.difficulty == "Hard").length];
    this.myChart.update();
  }
}
