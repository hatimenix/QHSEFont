import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
import { GroupeUserService } from 'src/app/Services/Services-GroupesUser/groupe-user.service';
import { GroupeUser } from 'src/app/models/GroupeUser';
import { UserApp } from 'src/app/models/UserApp';

@Component({
  selector: 'app-update-groupes',
  templateUrl: './update-groupes.component.html',
  styleUrls: ['./update-groupes.component.css']
})
export class UpdateGroupesComponent {
  groupForm: FormGroup;
  users: UserApp[];
  userapp$!: Observable<any>;
  groupId!: number;

  //modal
  @ViewChild('successModal', { static: true }) successModal: any;
  modalRef!: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private groupService: GroupeUserService,
    private router: Router,
    private bsModalService: BsModalService,
    private route: ActivatedRoute
  ) {
    this.groupForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      proprietaire_groupe: [[]],
      autorisation: ['']
    });
    this.users = [];
    this.groupId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);
    this.userService.getUsers().subscribe(users => {
      this.users = users;

      this.groupService.getGroupeUserById(this.groupId).subscribe(groupData => {
        this.groupForm.patchValue({
          nom: groupData.nom,
          description: groupData.description,
          proprietaire_groupe: groupData.proprietaire_groupe,
          autorisation: groupData.autorisation // Retrieve the first element of the autorisation array
        });
      });
    });

    this.userapp$ = this.userService.getUsers();
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const groupId: number = this.groupId; // Obtain the ID of the group you want to modify;

      // Create a new GroupeUser object from the form values
      const updatedGroup: GroupeUser = {
        nom: this.groupForm.value.nom,
        description: this.groupForm.value.description,
        proprietaire_groupe: this.groupForm.value.proprietaire_groupe,
        proprietaire_groupe_names: '',
        membres_names: '',
        id: groupId,
        groupe_name: this.groupForm.value.groupe_name,
        autorisation: this.groupForm.value.autorisation // Update the autorisation field
      };

      updatedGroup.proprietaire_groupe_names = this.getSelectedUserNames(updatedGroup.proprietaire_groupe);

      this.groupService.updateGroupeUser(groupId, updatedGroup).subscribe(updatedGroupData => {
        // Perform necessary actions after modifying the group
        this.openModal();
        this.router.navigate(['/listgroupeusers']);
        console.log('Groupe utilisateur modifié:', updatedGroupData);
      });
    }
  }

  getSelectedUserNames(selectedUsers: UserApp[]): string {
    return selectedUsers.map(user => user.nom_complet).join(', ');
  }

  // Méthode pour gérer la sélection d'utilisateurs multiples
  onUserSelect(event: any): void {
    const selectedUsers: UserApp[] = event.value;
    this.groupForm.patchValue({
      proprietaire_groupe: selectedUsers
    });
  }

  //modal functions 
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }

  closeModal() {
    this.bsModalService.hide();
  }
}
