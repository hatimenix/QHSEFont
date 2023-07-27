import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GroupeUserService } from 'src/app/Services/Services-GroupesUser/groupe-user.service';
import { GroupeUser } from 'src/app/models/GroupeUser';

@Component({
  selector: 'app-list-groupes',
  templateUrl: './list-groupes.component.html',
  styleUrls: ['./list-groupes.component.css']
})
export class ListGroupesComponent{
  groupes: GroupeUser[] = [];
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  @ViewChild('groupModal') groupModal!: TemplateRef<any>; // reference to the user modal template
  modalRef!: BsModalRef;
  //search
  searchQuery: string = '';
  groupeIdToDelete: number = 0;
  selectedPermission: string = ''; 
  selectedGroup: GroupeUser | null = null; // Add this variable to store the selected personnel


  constructor(private groupeUserService: GroupeUserService,
    public modalService: BsModalService,
     ) { }

  ngOnInit(): void {
    this.getGroupes();
  }

  getGroupes(): void {
    this.groupeUserService.getGroupes()
      .subscribe(groupes => this.groupes = groupes);
  }
  //Modal de suppression 
  confirmDelete(): void {
    this.groupeUserService.deleteGroupeUser(this.groupeIdToDelete).subscribe(() => {
      this.groupes = this.groupes.filter(g => g.id !== this.groupeIdToDelete);
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
    return Math.ceil(this.groupes.length / this.itemsPerPage);
  }
  
  get displayedGroupes(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.groupes.slice(startIndex, endIndex);
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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.groupes.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.groupes.length} entrées`;
  }
  
  
  openModal(template: TemplateRef<any>, groupe: GroupeUser): void {
    this.selectedGroup = groupe; // Set the selected personnel data
    this.modalRef = this.modalService.show(template);
  }
  
  closeModal() {
    this.modalRef?.hide();
  }

}
