import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  template: `
    <h2 mat-dialog-title>Datos de Usuario</h2>
    <mat-dialog-content>
      <p><strong>Nombre:</strong> {{ data.nombre }}</p>
      <p><strong>Apellido:</strong> {{ data.apellido }}</p>
      <p><strong>Nivel Educacional:</strong> {{ data.educacion }}</p>
      <p><strong>Fecha de Nacimiento:</strong> {{ data.nacimiento | date: 'shortDate' }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
