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
  newPassword: string = '';
  confirmPassword: string = '';
  passwordResetForm!: FormGroup;
  passwordResetSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];

    this.passwordResetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.passwordResetForm.controls;
  }

  resetPassword() {
    if (this.passwordResetForm.invalid) {
      console.error('Form is invalid. Please check the fields.');
      return;
    }

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
    this.router.navigate(['/login']);
  }
  }


