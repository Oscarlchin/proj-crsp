import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

@Injectable()
export class AlertService {

    constructor(private snackBar: MatSnackBar,
      public dialog: MatDialog) {
    }

    showAlert(msg: string) {
        this.snackBar.open(msg, null, {
            duration: 3000,
            verticalPosition: 'top'
        });
    }
}
