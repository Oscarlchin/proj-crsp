// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

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
