import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { IProduct } from '../../shared/interfaces/product.inferface';
import { ProductsService } from './../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: ` <h2 mat-dialog-title>Deletar produto</h2>
    <mat-dialog-content>
      Tem certeza que deseja deletar esse produto?
    </mat-dialog-content>
    <mat-dialog-actions [align]="'end'">
      <button mat-raised-button (click)="onNo()">Não</button>
      <button
        mat-raised-button
        color="accent"
        (click)="onYes()"
        cdkFocusInitial
      >
        Sim
      </button>
    </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  products: IProduct[] = [];

  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  ngOnInit() {
    this.productsService.getAll().subscribe({
      next: (products: any) => {
        this.products = products;
      },
    });
  }

  onEdit(product: IProduct) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: IProduct) {
    this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter((answer) => answer === true))
      .subscribe(() =>
        this.productsService.delete(product.id).subscribe(() => {
          this.productsService.getAll().subscribe({
            next: (products: any) => {
              this.products = products;
            },
          });
        })
      );
  }
}
