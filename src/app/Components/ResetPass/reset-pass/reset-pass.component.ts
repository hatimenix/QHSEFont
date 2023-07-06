import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent {

  uidb64: string | null;
  token: string | null;
  newPassword!: string;
  confirmPassword!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.uidb64 = this.route.snapshot.paramMap.get('uidb64');
    this.token = this.route.snapshot.paramMap.get('token');
  }

  submitForm() {
    if (this.newPassword !== this.confirmPassword) {
      // Show error message indicating password mismatch
      return;
    }
  
    const formData = new FormData();
  
    // Handle uidb64
    if (this.uidb64 !== null) {
      formData.append('uidb64', this.uidb64);
    }
  
    // Handle token
    if (this.token !== null) {
      formData.append('token', this.token);
    }
  
    formData.append('new_password', this.newPassword);
    this.http.post('/api/reset-password/', formData).subscribe(
      response => {
        console.log(response);
        // Show success message or redirect to a success page
      },
      error => {
        console.error(error);
        // Show error message or handle the error
      }
    );
  }
  
}
