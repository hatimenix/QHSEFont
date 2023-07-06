import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
import { GroupeUserService } from 'src/app/Services/Services-GroupesUser/groupe-user.service';
import { GroupeUser } from 'src/app/models/GroupeUser';
import { UserApp } from 'src/app/models/UserApp';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {

  users!: UserApp[];
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  @ViewChild('userModal') userModal!: TemplateRef<any>; // reference to the user modal template
  modalRef!: BsModalRef;
  userIdToDelete: number = 0;
   //search
  searchQuery: string = '';
  constructor(private userAppService: UsersService,
    public modalService: BsModalService, ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userAppService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.log('An error occurred while retrieving users:', error);
      }
    );
  }
  deleteUer(id: number): void {
    this.userAppService.deleteUserApp(id).subscribe(() => {
      this.users = this.users.filter((u => u.id !== id));
    });
  }

  //delete modal
  confirmDelete(): void {
    this.userAppService.deleteUserApp(this.userIdToDelete).subscribe(() => {
      this.users = this.users.filter(u => u.id !== this.userIdToDelete);
      this.modalRef.hide();
    });
  }

  declineDelete(): void {
    this.modalRef.hide();
  }
  //search 
  resetSearchQuery() {
    this.searchQuery = '';
  }
  
  //pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.users.length / this.itemsPerPage);
}

get displayedUsers(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.users.slice(startIndex, endIndex);
}


onItemsPerPageChange(option: number) {
  this.p = 1; 
  this.itemsPerPage = option; 
}
getPageNumbers(): number[] {
  const pageNumbers = [];
  for (let i = 1; i <= this.totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}

getDisplayedRange(): string {
  const startIndex = (this.p - 1) * this.itemsPerPage + 1;
  const endIndex = Math.min(this.p * this.itemsPerPage, this.users.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.users.length} entrées`;
}


}
