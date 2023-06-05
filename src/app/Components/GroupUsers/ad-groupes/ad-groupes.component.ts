import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
import { PermissionService } from 'src/app/Services/Service-permission/permission.service';
import { GroupeUserService } from 'src/app/Services/Services-GroupesUser/groupe-user.service';
import { GroupeUser } from 'src/app/models/GroupeUser';
import { UserApp } from 'src/app/models/UserApp';


@Component({
  selector: 'app-ad-groupes',
  templateUrl: './ad-groupes.component.html',
  styleUrls: ['./ad-groupes.component.css']
})
export class AdGroupesComponent {
  groupForm: FormGroup;
  users: UserApp[];
  userapp$ !: Observable<any>;
  group$!: Observable<any>;
  selectedPermission: string = ''; 

  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private groupService: GroupeUserService,
    private router: Router,
    private bsModalService: BsModalService, 
    private permissionService : PermissionService


  ) {
    this.groupForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      proprietaire_groupe: [[]],
      // membres: [[]],
      groupe_name:['']
    });
    this.users = [];
  }

  ngOnInit(): void {
    // Récupérer la liste des utilisateurs depuis le service UserService
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.userapp$ = this.userService.getUsers();
    this.group$=this.groupService.getGroupes();
  }
  //récuperer les checkbox selectionné
  getSelectedCheckboxId(): string[]  {
    const checkboxes = document.querySelectorAll('#idGroupe input[type="checkbox"]:checked');
    const selectedIds: string[] = [];
    checkboxes.forEach((checkbox) => {
    selectedIds.push((checkbox as HTMLInputElement).value);
    });
    return selectedIds;
    }

  onSubmit(): void {
    if (this.groupForm.valid) {
      //selected Permissions
      const selectedPermission = this.groupForm.value.groupe_name;
      // Créer un nouvel objet GroupeUser à partir des valeurs du formulaire
      const newGroup: GroupeUser = {
        nom: this.groupForm.value.nom,
        description: this.groupForm.value.description,
        proprietaire_groupe: this.groupForm.value.proprietaire_groupe,
        // membres: this.groupForm.value.membres,
        proprietaire_groupe_names: '',
        membres_names: '',
        id: 0,
        groupe_name: selectedPermission
      };
      
      // Remplir les noms des utilisateurs sélectionnés
      newGroup.proprietaire_groupe_names = this.getSelectedUserNames(newGroup.proprietaire_groupe);
      // newGroup.membres_names = this.getSelectedUserNames(newGroup.membres);



      // Appeler la méthode du service pour créer le groupe utilisateur
      this.groupService.createGroupeUser(newGroup).subscribe(createdGroup => {
       
      // if (createdGroup.group) {
      //   for (const user of createdGroup.membres) {
      //     createdGroup.group.user_set.add(user); 
      //   }
      // }
        // Apply permissions to the users in the group
        this.permissionService.updateUserPermissions(selectedPermission);
        // Effectuer les actions nécessaires après la création du groupe
        this.openModal();
        this.router.navigate(['/listgroupeusers']); 
        console.log('Groupe utilisateur créé :', createdGroup);
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
  
//permission selected 
onPermissionChange(selectedPermission: string) {
  this.permissionService.setSelectedPermission(selectedPermission);
}

}
