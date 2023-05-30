import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';
import { UserApp } from 'src/app/models/UserApp';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage!: string;
  loginForm!: FormGroup;
  user!: UserApp | null; // Add the user property

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin(): void {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      response => {
        this.authService.saveTokens(response);
        this.user = response.user; 
        console.log("user est ", this.user)
        this.router.navigate(['/home']);
      },
      error => {
        console.error(error);
        if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
          this.errorMessage = 'An error occurred during login.';
        } else if (error instanceof HttpErrorResponse && error.status === 400) {
          this.errorMessage = error.error?.message || 'Invalid email or password.';
        } else {
          this.errorMessage = 'An error occurred during login.';
        }
      }
    );
  }
}
