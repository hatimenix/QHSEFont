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
}
