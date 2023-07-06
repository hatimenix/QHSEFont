import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Personnel } from 'src/app/models/Personnel';


@Component({
  selector: 'app-list-personnel',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.css']
})
export class ListPersonnelComponent implements OnInit{
  personnels: Personnel[] = [];
  //delete modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  PersonnelIdToDelete: number = 0;
  //search
  searchQuery: string = '';

constructor(private personnelService: PersonnelService,  public modalService: BsModalService) { }

ngOnInit(): void {
this.loadPersonnels();
//pagination 
this.itemsPerPageOptions = [5, 10, 15];
this.itemsPerPage = this.itemsPerPageOptions[0];

}

loadPersonnels() {
this.personnelService.getPersonnels().subscribe(
(data: Personnel[]) => {
this.personnels = data;
}
)
}

deletePersonnel(id: number) :void{
  this.personnelService.deletePersonnel(id).subscribe(() => {
    this.personnels = this.personnels.filter((p) => p.id !== id);
  });
}
//delete modal 
confirmDelete(): void {
  this.personnelService.deletePersonnel(this.PersonnelIdToDelete)
    .subscribe(() => {
      this.personnels = this.personnels.filter(c => c.id !== this.PersonnelIdToDelete);
      this.modalRef.hide();
    });
}

  declineDelete(): void {
  this.modalRef.hide();
  }
  resetSearchQuery() {
    this.searchQuery = '';
  }

  //pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.personnels.length / this.itemsPerPage);
}

get displayedSites(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.personnels.slice(startIndex, endIndex);
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.personnels.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.personnels.length} entrées`;
}
}
