import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  adresse_email!: string;
  password!: string;
  errorMessage!: string ;

  constructor(private authService: AuthService, private router: Router) {}
  onLogin(): void {
    this.authService.login(this.adresse_email, this.password).subscribe(
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
