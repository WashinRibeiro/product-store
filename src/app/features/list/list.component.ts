import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../shared/interfaces/product.inferface';
import { ProductsService } from './../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
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
