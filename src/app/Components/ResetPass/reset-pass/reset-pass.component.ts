import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  
  passwordResetForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.passwordResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.passwordResetForm.valid) {
      const email = this.passwordResetForm.get('email')?.value;
      this.sendPasswordResetEmail(email);
    }
  }

  sendPasswordResetEmail(email: string) {
    // Send the email to the backend for processing
    this.http.post<any>('http://localhost:8001/api/send-password-reset-email/', { email }).subscribe(
      (response) => {
        alert(response.message); // Show success message to the user
      },
      (error) => {
        alert(error.error); // Show error message to the user
      }
    );
  }
}
