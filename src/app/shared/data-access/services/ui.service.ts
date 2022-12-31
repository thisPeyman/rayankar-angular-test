import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private _snackBar: MatSnackBar) {}

  notifyError(errorCode: number) {
    this._snackBar.open(this.getMessageByErrorCode(errorCode), 'Ok', {
      duration: 3000,
    });
  }

  private getMessageByErrorCode(errorCode: number): string {
    switch (errorCode) {
      case 201:
        return 'This Email has already been taken';
      case 202:
        return 'First-name, Last-name or Date-of-Birth is duplicated';

      default:
        return 'There is an error';
    }
  }
}
