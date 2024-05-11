import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { IProduct } from '../../shared/interfaces/product.inferface';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  product: IProduct = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit(product: IProduct) {
    this.productsService.put(this.product.id, product).subscribe(() => {
      this.matSnackBar.open('Produto editado com sucesso', 'Ok');
      this.router.navigateByUrl('/');
    });
  }
}
