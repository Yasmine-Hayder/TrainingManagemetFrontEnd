import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private  snackbar:MatSnackBar) { 
  }
  showNotification(mesage:string, button:string){
    this.snackbar.open(mesage,button,{
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }
}
