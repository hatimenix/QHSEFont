import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit{
  

  token!: string;
  newPassword!: string;
  confirmPassword!: string;
  passwordResetSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    console.log(this.route.snapshot.params); // Check the entire params object
    this.token = this.route.snapshot.params['token']; // Use square brackets notation here
    console.log('Token:', this.token); // Check the extracted token value
  }

  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      this.http.post<any>(`http://localhost:8001/api/reset-password/${this.token}/`, { new_password: this.newPassword }).subscribe(
        () => {
          this.passwordResetSuccess = true;
        },
        (error) => {
          console.error('Error resetting password:', error);
        }
      );
    } else {
      console.error('Passwords do not match.');
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']); // Redirect to the login page after successful password reset
  }

  }


