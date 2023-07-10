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
  resetForm!: FormGroup;
  userId!: string;
  token!: string;
  newPassword: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];
    });
  }

  resetPassword() {
    const resetPasswordUrl = `http://localhost:8001/api/reset-password/${this.userId}/${this.token}/`;

    const requestBody = {
      password: this.newPassword
    };

    this.http.post(resetPasswordUrl, requestBody).subscribe(
      response => {
        // Handle success response
        console.log('Password reset successful');
      },
      error => {
        // Handle error response
        console.error('Password reset failed:', error);
      }
    );
  }
}
