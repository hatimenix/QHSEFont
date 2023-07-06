import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent{
  
  email: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const payload = { email: this.email };
    this.http.post('/api/forgot-password', payload).subscribe(
      () => {
        console.log('Password reset email sent');
      },
      (error) => {
        console.error('Failed to send password reset email', error);
      }
    );
  }
}
