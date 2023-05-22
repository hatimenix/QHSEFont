import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage!: string;
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      adresse_email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin(): void {
    const { adresse_email, password } = this.loginForm.value;

    this.authService.login(adresse_email, password).subscribe(
      response => {
        // Handle successful authentication
        // Assuming the response contains tokens: { access, refresh }
        this.authService.saveTokens(response);
        // Redirect to the home page
        this.router.navigate(['/home']);
      },
      error => {
        // Handle authentication error
        console.error(error);
        if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle accordingly.
          this.errorMessage = 'An error occurred during login.';
        } else if (error instanceof HttpErrorResponse && error.status === 400) {
          // A 400 Bad Request error occurred. Retrieve and display the error message.
          this.errorMessage = error.error?.message || 'Invalid email or password.';
        } else {
          // Other error occurred. Handle accordingly.
          this.errorMessage = 'An error occurred during login.';
        }
      }
    );
  }
}
