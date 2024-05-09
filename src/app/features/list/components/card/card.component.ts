import { MatButtonModule } from '@angular/material/button';
import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../../../shared/interfaces/product.inferface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  product = input.required<IProduct>()
  productTitle = computed(() => this.product().title)
}
