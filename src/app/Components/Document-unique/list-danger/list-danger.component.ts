import { Component } from '@angular/core';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';

@Component({
  selector: 'app-list-danger',
  templateUrl: './list-danger.component.html',
  styleUrls: ['./list-danger.component.css']
})
export class ListDangerComponent {

  dangers: any;
  p = 1;
  itemsPerPage: number = 5;

  constructor(private apiDangerService: ApiDangerService) { }

  ngOnInit() {
    this.fetchDanger();
  }

  fetchDanger() {
    this.apiDangerService.getAllDanger().subscribe((data) => {
      this.dangers = data;
    })
  }

  deleteDanger(id : any) {
    this.apiDangerService.delDanger(id).subscribe(() => {
      this.fetchDanger();
    })
  }

}
