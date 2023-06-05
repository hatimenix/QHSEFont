import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/Services/Service-Users/users.service';
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
  

  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private groupService: GroupeUserService,
    private router: Router,
    private bsModalService: BsModalService, 
  ) {
    this.groupForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      proprietaire_groupe: [[]],
      groupe_name:[''], 
      autorisation:['']
    });
    this.users = [];
  }

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');
      // rafraîchir la page
      location.reload();
    }
    // aller en haut de la page
    window.scrollTo(0, 0);
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
      const selectedAutorisation = this.groupForm.value.autorisation; // Get the selected autorisation value

      const newGroup: GroupeUser = {
        nom: this.groupForm.value.nom,
        description: this.groupForm.value.description,
        proprietaire_groupe: this.groupForm.value.proprietaire_groupe,
        proprietaire_groupe_names: '',
        membres_names: '',
        id: 0,
        groupe_name: '', 
        autorisation:selectedAutorisation
      };
      

      newGroup.proprietaire_groupe_names = this.getSelectedUserNames(newGroup.proprietaire_groupe);
      this.groupService.createGroupeUser(newGroup).subscribe(createdGroup => {
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
  


}
