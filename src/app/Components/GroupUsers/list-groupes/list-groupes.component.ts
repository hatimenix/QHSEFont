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
  @ViewChild('userModal') userModal!: TemplateRef<any>; // reference to the user modal template
  modalRef!: BsModalRef;
  //search
  searchQuery: string = '';
  groupeIdToDelete: number = 0;
  selectedPermission: string = ''; 

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
  




}
