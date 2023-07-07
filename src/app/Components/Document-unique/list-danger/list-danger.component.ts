import { Component } from '@angular/core';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';

declare var window:any;

@Component({
  selector: 'app-list-danger',
  templateUrl: './list-danger.component.html',
  styleUrls: ['./list-danger.component.css']
})
export class ListDangerComponent {

  dangers: any;
  deletModal : any;
  idToDelete: number = 0;

  constructor(private apiDangerService: ApiDangerService) { }

  ngOnInit() {
    this.fetchDanger();
    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteDanger')
    );
  }

  fetchDanger() {
    this.apiDangerService.getAllDanger().subscribe((data) => {
      this.dangers = data;
    })
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deletModal.show();
  }

  deleteDanger() {
    this.apiDangerService.delDanger(this.idToDelete).subscribe(() => {
      this.fetchDanger();
      this.deletModal.hide();
    })
  }

  //pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.dangers.length / this.itemsPerPage);
}

get displayedFiches(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.dangers.slice(startIndex, endIndex);
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.dangers.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.dangers.length} entrées`;
}

}
