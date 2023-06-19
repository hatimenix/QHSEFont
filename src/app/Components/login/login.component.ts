import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  loginAttempts: number = 0;


  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
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
        this.authService.getUser().subscribe(
          () => {
            this.router.navigate(['/home']);
          },
          error => {
            console.error(error);
            this.errorMessage = 'An error occurred during login.';
          }
        );
      },
      error => {
        console.error(error);
        if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
          this.errorMessage = 'An error occurred during login.';
        } else if (error instanceof HttpErrorResponse && error.status === 400) {
          if (this.loginAttempts < 2) {
            this.errorMessage = error.error?.message || 'Invalid email or password.';
          } else {
            this.errorMessage = 'Attention, après 3 mauvaises saisies de mot de passe, votre compte sera bloqué. Pour le débloquer, merci de contacter votre administrateur.';
          }
          this.loginAttempts++;
        } else {
          this.errorMessage = 'An error occurred during login.';
        }
      }
    );
  }
  
}
