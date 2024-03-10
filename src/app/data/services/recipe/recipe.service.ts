import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { API } from '../../../shared/constants/constants-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url = `${environment.apiUrl}${API.recipe.baseUrl}`;
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllRecipe() {
    return this.httpClient.get(`${this.url}?limit=0`);
  }

  getAllTags() {
    return this.httpClient.get(`${this.url}${API.recipe.getAllTags}`);
  }
}
