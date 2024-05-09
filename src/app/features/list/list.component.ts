import { Component, OnInit, inject } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.inferface';
import { ProductsService } from './../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  products: IProduct[] = []
  productsService = inject(ProductsService)

  ngOnInit() {
    this.productsService.getAll().subscribe({
      next: (products: any) => {
        this.products = products
      }
    })
  }
}
