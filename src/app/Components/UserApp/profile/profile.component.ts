import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/Services/Service-Users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  id!: number;
  isModalOpen: boolean = false;
  selectedImageFile: File | null = null;


  currentId:any
  constructor(private userAppService: UsersService, 
    private route: ActivatedRoute,    private router: Router,) {}

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
   
  }
  openModal(event: Event) {
    event.stopPropagation(); // Prevents the click event from propagating to the modal backdrop
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal() {
    this.isModalOpen = false;
  }
  onSubmit() {
    console.log('Form submitted');
    const formData = new FormData();
    formData.append('nom', this.currentId.nom);
    formData.append('nom_user', this.currentId.nom_user);
    formData.append('email', this.currentId.email);
    formData.append('compte', this.currentId.compte);
    if (this.selectedImageFile !== null) {
      formData.append('image', this.selectedImageFile); // Append the selected image file
    }  
    this.userAppService.updateUserFormdata(this.id, formData).subscribe(response => {
      // Handle the response from the server
      console.log('Profile updated successfully');
      this.router.navigate(['/profile']);
      this.isModalOpen = false;

      this.currentId = response; 
    });
  }
   // Method to handle file input change
  onFileChange(event: any) {
    this.selectedImageFile = event.target.files[0];
  }
}
