import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string},
              private _dialog:MatDialogRef<ModalComponent>,private _route:Router) {}

  
  goToLogin(){
    this._dialog.close();
    this._route.navigate([""])
  }
}
