import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form in the constructor
    this.myForm = this.formBuilder.group({
      firstName: new FormControl(),
    });
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('',Validators.required)

      // Add other form controls if needed
    });
  }
}
