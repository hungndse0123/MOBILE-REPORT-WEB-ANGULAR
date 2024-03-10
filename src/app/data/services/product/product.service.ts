import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { API } from '../../../shared/constants/constants-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.apiUrl}${API.product.baseUrl}`;
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProduct() {
    return this.httpClient.get(`${this.url}?limit=0`);
  }

  getAllCategories() {
    return this.httpClient.get(`${this.url}${API.product.getCategories}`);
  }
}
