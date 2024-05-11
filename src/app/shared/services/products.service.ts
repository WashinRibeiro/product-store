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

  get(id: string) {
    return this.httpClient.get<IProduct>(`/api/products/${id}`);
  }

  post(payload: ProductPayload) {
    return this.httpClient.post<ProductPayload>('/api/products', payload);
  }

  put(id: string, payload: ProductPayload) {
    return this.httpClient.put<ProductPayload>(`/api/products/${id}`, payload);
  }

  delete(id: string) {
    return this.httpClient.delete(`/api/products/${id}`);
  }
}
