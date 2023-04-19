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
  p = 1;
  itemsPerPage: number = 5;
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

}
