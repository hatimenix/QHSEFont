import { Component } from '@angular/core';
import { ApiEvenementService } from 'src/app/Services/Service-document-unique/api-evenement.service';

declare var window:any;

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.css']
})
export class EvenementListComponent {

  evenements : any;
  p = 1;
  itemsPerPage: number = 5;
  deletModal : any;
  idToDelete: number = 0;

  constructor(private apiEvenementService : ApiEvenementService) { }

  ngOnInit() {
    this.fetchEvenement();
    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteEvenement')
    );
  }

  fetchEvenement() {
    this.apiEvenementService.getAllEvenement().subscribe((data) => {
      this.evenements = data;
    })
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deletModal.show();
  }

  deleteEvenement() {
    this.apiEvenementService.delEvenement(this.idToDelete).subscribe(() => {
      this.fetchEvenement();
      this.deletModal.hide();
    })
  }

}
