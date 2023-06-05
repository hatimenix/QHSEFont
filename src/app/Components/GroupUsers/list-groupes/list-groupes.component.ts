import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PermissionService } from 'src/app/Services/Service-permission/permission.service';
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
  groupeIdToDelete: number = 0;
  selectedPermission: string = ''; 

  constructor(private groupeUserService: GroupeUserService,
    public modalService: BsModalService,
    public permissionService: PermissionService ) { }

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
   // Get the selected permission
   getSelectedPermission(): void {
    this.selectedPermission = this.permissionService.getPermission(this.selectedPermission); // Replace with your actual implementation to get the selected permission
  }

  // Function to check if the button should be disabled based on the selected permission
  isAddButtonDisabled(): boolean {
    return this.permissionService.isAddButtonDisabled();
  }

  isDeleteButtonDisabled(): boolean {
    return this.permissionService.isDeleteButtonDisabled();
  }


}
