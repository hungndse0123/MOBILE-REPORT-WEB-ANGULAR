import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { API } from '../../../shared/constants/constants-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${environment.apiUrl}${API.user.baseUrl}`;
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUsers() {
    return this.httpClient.get(`${this.url}?limit=0`);
  }
}
