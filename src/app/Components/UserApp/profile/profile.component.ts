import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
import { AuthService } from 'src/app/Services/Service-authentification/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Site } from 'src/app/models/Site';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  
  @ViewChild('successModal', { static: true }) successModal: any;
  @ViewChild('updateModal', { static: true }) updateModal: any;

  
  @ViewChild('changePasswordModal', { static: true }) changePasswordModal: any;
  id!: number;
  isModalOpen: boolean = false;
  selectedImageFile: File | null = null;
  isModificationSuccess: boolean = false;
  errorMessageLast: string = ''; // Property to hold the error message
  errorMessageConfirm: string='';
  currentId:any
  modalRef!: BsModalRef;
  isEmailDisabled: boolean = true; 
  passwordChangeModalRef!: BsModalRef;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  apiUrl: string;
  errorMessagePassword: string= '';
  

  
 

  constructor(private userAppService: UsersService, 
    private route: ActivatedRoute, private router: Router,
     private bsModalService: BsModalService, private authService: AuthService,
     private http: HttpClient,  private formBuilder: FormBuilder // Add the formBuilder here
     ) {
      this.apiUrl = 'http://localhost:8001';
    
     
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

  //change password methods

  onSubmitChangePasswordForm() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessageConfirm = "Nouveau mot de passe et confirmer mot de passe ne correspondent pas";
      return;
    }
  
    const payload = {
      old_password: this.oldPassword,
      new_password: this.newPassword,
    };
  
    this.authService.getUser().subscribe(
      (user) => {
        const accessToken = this.authService.getAccessToken();
        if (accessToken) {
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
  
          this.http.post(`${this.authService.API_ChangePassword}`, payload, { headers }).subscribe(
            (response: any) => {
              // Password change successful, handle the response message if needed
              console.log(response.message);
  
              // Close the change password modal
              this.passwordChangeModalRef.hide();
  
              // Reset the password fields
              this.oldPassword = '';
              this.newPassword = '';
              this.confirmPassword = '';
  
              // Display a success message
              this.errorMessageLast = '';
              this.errorMessageConfirm = '';
              this.errorMessagePassword = '';
              this.showPasswordChangeSuccessModal(); // Show the success modal here
  
              // Delay the logout by a few seconds to display the success modal
              setTimeout(() => {
                this.authService.logout();
              }, 3000); // Adjust the delay time as needed
            },
            (error) => {
              // Handle password change error, e.g., incorrect old password or validation error
              console.error(error.error.message);
  
              if (error.error.message.includes("This password is too short.")) {
                this.errorMessagePassword = "Le mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial*";
              } else {
                this.errorMessageLast = 'Ancien mot de passe incorrect';
              }
            }
          );
        } else {
          console.error('Invalid or expired access token');
          // Handle the case where the token is missing or expired (e.g., show a message or redirect to login)
        }
      },
      (error) => {
        console.error('Error fetching user details', error);
        // Handle error fetching user details (optional)
      },
    );
  }
  
  openChangePasswordModal(template: TemplateRef<any>) {
    this.passwordChangeModalRef = this.bsModalService.show(template);
  }

  showPasswordChangeSuccessModal() {
    // Show the success modal
    this.modalRef = this.bsModalService.show(this.updateModal);
  
    // Add a timer to hide the modal after 3 seconds (adjust the time as needed)
    setTimeout(() => {
      this.modalRef.hide();
    }, 3000); // Adjust the delay time (in milliseconds) as needed
  }

  closePasswordChangeModal(){
    this.modalRef.hide();
  }
  


  
}
