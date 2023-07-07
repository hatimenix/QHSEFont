import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiEvenementService } from 'src/app/Services/Service-document-unique/api-evenement.service';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Evenement } from 'src/app/models/evenement';

declare var window:any;

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.css']
})
export class EvenementListComponent {

  evenementForm!: FormGroup;
  evenements : any;
  idEvenement !: number;
  sites$ !: Observable<any>;
  services$ !: Observable<any>;
  deletModal : any;
  idToDelete: number = 0;

  //search
  searchQuery: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiSiteService: ApiSiteService,
    private apiServiceService: ApiServiceService,
    private apiEvenementService : ApiEvenementService) { }

  ngOnInit() {
    this.fetchEvenement();

    this.evenementForm = this.formBuilder.group({
      type_contract: ['', Validators.required],
      nom_personne: ['', Validators.required],
      type_evenement: ['', Validators.required],
      intitule: ['', Validators.required],
      resume: ['', Validators.required],
      temoins: ['', Validators.required],
      premiere_pers_info: ['', Validators.required],
      action_immediate: ['', Validators.required],
      date_accident: ['', Validators.required],
      periode_travail: ['', Validators.required],
      lieu_accident: ['', Validators.required],
      tache_effectue: ['', Validators.required],
      utiliser_chien: ['', Validators.required],
      siege_de_lesions_1: [''],
      siege_de_lesions_2: [''],
      nature_lesions: ['', Validators.required],
      site: ['', Validators.required],
      service: ['', Validators.required]
    });

    this.deletModal = new window.bootstrap.Modal(
      document.getElementById('deleteEvenement')
    );

    this.sites$ = this.apiSiteService.getAllSite();
    this.services$ = this.apiServiceService.getAllService();
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

  openUpdateModal(evenement: Evenement): void {
    this.evenements = evenement;
    this.idEvenement = this.evenements.id;
    this.evenementForm.patchValue({
      type_contract: this.evenements.type_contract,
      nom_personne: this.evenements.nom_personne,
      type_evenement: this.evenements.type_evenement,
      intitule: this.evenements.intitule,
      resume: this.evenements.resume,
      temoins: this.evenements.temoins,
      premiere_pers_info: this.evenements.premiere_pers_info,
      action_immediate: this.evenements.action_immediate,
      date_accident: this.evenements.date_accident,
      periode_travail: this.evenements.periode_travail,
      lieu_accident: this.evenements.lieu_accident,
      tache_effectue: this.evenements.tache_effectue,
      utiliser_chien: this.evenements.utiliser_chien,
      siege_de_lesions_1: this.evenements.siege_de_lesions_1,
      siege_de_lesions_2: this.evenements.siege_de_lesions_2,
      nature_lesions: this.evenements.nature_lesions,
      site: this.evenements.site,
      service: this.evenements.service
    });
    const modal = new window.bootstrap.Modal(document.getElementById('updateEvenement'));
    modal.show();
  }

  UpdateEvenementFormData(): void {
    if (this.evenementForm.valid) {
      const formData = new FormData();
      formData.append('type_contract', this.evenementForm.get('type_contract')!.value);
      formData.append('nom_personne', this.evenementForm.get('nom_personne')!.value);
      formData.append('type_evenement', this.evenementForm.get('type_evenement')!.value);
      formData.append('intitule', this.evenementForm.get('intitule')!.value);
      formData.append('resume', this.evenementForm.get('resume')!.value);
      formData.append('temoins', this.evenementForm.get('temoins')!.value);
      formData.append('premiere_pers_info', this.evenementForm.get('premiere_pers_info')!.value);
      formData.append('action_immediate', this.evenementForm.get('action_immediate')!.value);
      formData.append('date_accident', this.evenementForm.get('date_accident')!.value);
      formData.append('periode_travail', this.evenementForm.get('periode_travail')!.value);
      formData.append('lieu_accident', this.evenementForm.get('lieu_accident')!.value);
      formData.append('tache_effectue', this.evenementForm.get('tache_effectue')!.value);
      formData.append('utiliser_chien', this.evenementForm.get('utiliser_chien')!.value);
      formData.append('siege_de_lesions_1', this.evenementForm.get('siege_de_lesions_1')!.value);
      formData.append('siege_de_lesions_2', this.evenementForm.get('siege_de_lesions_2')!.value);
      formData.append('nature_lesions', this.evenementForm.get('nature_lesions')!.value);
      formData.append('site', this.evenementForm.get('site')!.value);
      formData.append('service', this.evenementForm.get('service')!.value);


      this.apiEvenementService.updateEvenementFormdata(this.idEvenement,formData).subscribe(
          () => {
            console.log('Evenement a été modifiée avec succès.');
            this.fetchEvenement();
          },
          error => console.log(error)
        );
      }
    }

    resetSearchQuery() {
      this.searchQuery = '';
    }

    //pagination methods 
    itemsPerPageOptions: number[] = [5, 10, 15];
    itemsPerPage: number = this.itemsPerPageOptions[0];
    p: number = 1;
    get totalPages(): number {
      return Math.ceil(this.evenements.length / this.itemsPerPage);
    }

    get displayedFiches(): any[] {
      const startIndex = (this.p - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.evenements.slice(startIndex, endIndex);
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
      const endIndex = Math.min(this.p * this.itemsPerPage, this.evenements.length);
      return `Affichage de ${startIndex} à ${endIndex} de ${this.evenements.length} entrées`;
    }

}
