import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from '../interfaces/product.inferface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<IProduct[]>('/api/products');
  }

  post(payload: any) {
    return this.httpClient.post<ProductPayload>('/api/products', payload);
  }
}
