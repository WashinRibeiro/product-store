import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Output, computed, input } from '@angular/core';
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

  @Output() edit = new EventEmitter()
  @Output() delete = new EventEmitter()

  onEdit() {
    this.edit.emit()
  }

  onDelete() {
    this.delete.emit()
  }
}
