import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/Services/Service-Users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  id!: number;
  isModalOpen: boolean = false;

  currentId:any
  constructor(private userAppService: UsersService, 
    private route: ActivatedRoute,) {}

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
  openModal() {
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal() {
    this.isModalOpen = false;
  }
  onSubmit() {
    console.log('Form submitted');
  
  }

}
