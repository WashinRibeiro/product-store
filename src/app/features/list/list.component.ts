import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { IProduct } from '../../shared/interfaces/product.inferface';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { ProductsService } from './../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  
  products = signal<IProduct[]>(
    inject(ActivatedRoute).snapshot.data['products']
  );

  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  confirmationDialogService = inject(ConfirmationDialogService);

  onEdit(product: IProduct) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: IProduct) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          this.productsService.getAll().subscribe({
            next: (products) => {
              this.products.set(products);
            },
          });
        });
      });
  }
}
