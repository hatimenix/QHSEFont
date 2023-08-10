import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent{
  
  @ViewChild('successModal', { static: true }) successModal:any;
  passwordResetForm!: FormGroup;
  modalRef!: BsModalRef;
  modalCloseTime: number = 2000;


  constructor(private formBuilder: FormBuilder, private http: HttpClient,private bsModalService: BsModalService) {}

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
        
        this.openModal(); // Show success message to the user
      },
      (error) => {
        alert(error.error); // Show error message to the user
      }
    );
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);

    // Set a timer to close the modal after the specified time
    setTimeout(() => {
      this.closeModal();
    }, this.modalCloseTime);
  }
  closeModal() {
    this.bsModalService.hide();
}
}
