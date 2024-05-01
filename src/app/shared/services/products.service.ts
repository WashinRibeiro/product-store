import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from '../interfaces/product.inferface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<IProduct[]>('/api/products');
  }
}
