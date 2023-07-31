import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  id!: number;
  isModalOpen: boolean = false;
  selectedImageFile: File | null = null;
  isModificationSuccess: boolean = false;

  @ViewChild('successModal', { static: true }) successModal: any;


  currentId:any
  modalRef!: BsModalRef;
  isEmailDisabled: boolean = true; 
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordChangeModalRef!: BsModalRef;
 

  constructor(private userAppService: UsersService, 
    private route: ActivatedRoute, private router: Router,
     private bsModalService: BsModalService, private authService: AuthService,
     private http: HttpClient) {}

    changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
      const body = {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      };
      return this.http.post<any>('/api/change-password', body);
    }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.userAppService.getUserById(this.id).subscribe(user => {
          this.currentId = user;
        });
      }
    });
    this.loadUserData();

   
  }
  loadUserData() {
    // Load the user data from the AuthService
    this.authService.getUser().subscribe(
      (user) => {
        // Handle the user data as needed
      },
      (error) => {
        // Handle the error, e.g., redirect to the login page if the user is not authenticated
      }
    );
  }

  onSubmit() {
    console.log('Form submitted');
    const formData = new FormData();
    formData.append('nom', this.currentId.nom);
    formData.append('nom_user', this.currentId.nom_user);
    formData.append('email', this.currentId.email);
    formData.append('compte', this.currentId.compte);
    formData.append('adresse_sip', this.currentId.adresse_sip);
    formData.append('fonction', this.currentId.fonction);
    formData.append('othermail', this.currentId.othermail);
    formData.append('numero_tel', this.currentId.numero_tel);
    if (this.selectedImageFile !== null) {
      formData.append('image', this.selectedImageFile); // Append the selected image file
    }  
    this.userAppService.updateUserFormdata(this.id, formData).subscribe(response => {
      // Handle the response from the server
      console.log('Profile updated successfully');
      this.openModal();

      this.router.navigate(['/profile']);
      this.isModalOpen = false;

      this.currentId = response;
       
    });
    
  }
   // Method to handle file input change
  onFileChange(event: any) {
    this.selectedImageFile = event.target.files[0];
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imagePreview = document.getElementById('avatar-preview') as HTMLImageElement;
        if (imagePreview) {
          imagePreview.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
      this.selectedImageFile = file; // Store the selected image file in your component
    }
  }
  onEditImage() {
    // Trigger the file input when the pencil icon is clicked
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.click();
    }
  }
  closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.style.display = 'none';
      this.isModificationSuccess = false;
    }
  }
  cancelModification() {
  
    this.router.navigate(['/profile']);
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);

  
  }
  
  closeModal() {
    this.modalRef.hide();
    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');

      location.reload();
    }
    window.scrollTo(0, 0);
  }


 // profile.component.ts
openChangePasswordModal(template: TemplateRef<any>) {
  this.passwordChangeModalRef = this.bsModalService.show(template, {
    class: 'modal-dialog-centered',
    backdrop: 'static',
    keyboard: false
  });
}

  onSubmitChangePasswordForm() {
    const oldPassword = this.oldPassword;
    const newPassword = this.newPassword;
    const confirmPassword = this.confirmPassword;

  
    this.authService
      .changePassword(this.currentId.email, oldPassword, newPassword)
      .subscribe(
        (response) => {
          console.log(response);
          this.passwordChangeModalRef.hide();
        },
        (error) => {
          console.error(error);
          
        }
      );
  }
}
