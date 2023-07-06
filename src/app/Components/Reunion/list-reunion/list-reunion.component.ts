import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ReunionService } from 'src/app/Services/Service-reunion/reunion.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
import { Reunion } from 'src/app/models/Reunion';

import { Site } from 'src/app/models/site';
import { Utilsateur } from 'src/app/models/utilsateur';
declare var window: any;

@Component({
  selector: 'app-list-reunion',
  templateUrl: './list-reunion.component.html',
  styleUrls: ['./list-reunion.component.css']
})
export class ListReunionComponent implements OnInit {

  @ViewChild('successModal', { static: true }) successModal: any;
  @ViewChild('utilisateurModal', { static: true }) utilisateurModal: any;



  selectedUtilisateur: Utilsateur | undefined
  utilisateurs: any[] = [];



  modalRef!: BsModalRef;
  searchQuery: string = '';
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  sites: any[] = [];
  records: any[] = [];
  site$ !: Observable<any>;

  idTodelete: number = 0;

  deleteModal: any;
  id: any


  titre: any
  type_reunion: any
  date_previsionnelle_reunion: any
  date_realisation_reunion: any
  presents: number[] = []
  personnes_exterieurs: any
  liste_diffusion: number[] = []
  ordre_jour: any
  reunion: Reunion[] = [];


  all_reunion: Reunion[] = []


  myForm: any;
  frm: any;

  constructor(private rnSer: ReunionService,
    private bsModalService: BsModalService,
    private utilisateurservice: ApiUtilisateurService


  ) {

  }


  form = new FormGroup({




    titre: new FormControl('', [Validators.required]),
    type_reunion: new FormControl(''),
    date_previsionnelle_reunion: new FormControl(''),
    date_realisation_reunion: new FormControl(''),
    presents: new FormControl(''),
    personnes_exterieurs: new FormControl(''),
    liste_diffusion: new FormControl(''),
    ordre_jour: new FormControl(''),




  });


  loadData() {
    this.rnSer.getReunions().subscribe(
      (data: Reunion[]) => {
        this.reunion = data;
        // Close all sites

      },
      (error) => {
        console.error('Error fetching Reunion:', error);
      }
    );
  }

  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }
  delete() {
    this.rnSer.deleteReunion(this.idTodelete).subscribe({
      next: (data) => {
        this.all_reunion = this.all_reunion.filter(_ => _.id != this.idTodelete)
        location.reload()
        this.deleteModal.hide();
      },
      error: (err) => {
        console.log(err);
      }



    });
  }

  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload();
  }
  updateModalVisible: boolean = true

  updateReunion(): void {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('titre', this.titre);
    formData.append('type_reunion', this.type_reunion);


    this.presents.forEach((pid: number) => {
      formData.append('presents', pid.toString());

    })
    this.liste_diffusion.forEach((pid: number) => {
      formData.append('liste_diffusion', pid.toString());

    })
    formData.append('personnes_exterieures', this.personnes_exterieurs);
    formData.append('ordre_jour', this.ordre_jour);

    if (this.date_previsionnelle_reunion !== null && this.date_previsionnelle_reunion !== undefined) {
      formData.append("date_previsionnelle_reunion", this.date_previsionnelle_reunion);
    }
    if (this.date_realisation_reunion !== null && this.date_realisation_reunion !== undefined) {
      formData.append("date_realisation_reunion", this.date_realisation_reunion);
    }

    // You can continue appending the remaining attributes

    // Finally, you can use the formData as needed, such as sending it in an HTTP request


    this.rnSer.update(this.id, formData)

      .subscribe({
        next: (res) => {
          console.log(res);
          this.openModal();
          this.updateModalVisible = false;
        },
        error: (e) => {
          console.error(e);
        }
      });
  }


  ngOnInit(): void {

    this.myForm = new FormGroup({
      site: new FormControl(''),


    });



    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );





    this.loadData()
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0];


    this.utilisateurservice.getAllUtilsateur().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs);
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );



  }


  isPresentSelected(presentsId: number): boolean {
    return this.presents.includes(presentsId);
  }
  togglePresent(presentsId: number): void {
    const index = this.presents.indexOf(presentsId);
    if (index > -1) {
      this.presents.splice(index, 1);
    } else {
      this.presents.push(presentsId);
    }
  }


  isListDiffSelected(liste_diffusionId: number): boolean {
    return this.liste_diffusion.includes(liste_diffusionId);
  }
  toggleListDiff(liste_diffusionId: number): void {
    const index = this.liste_diffusion.indexOf(liste_diffusionId);
    if (index > -1) {
      this.liste_diffusion.splice(index, 1);
    } else {
      this.liste_diffusion.push(liste_diffusionId);
    }
  }


  get totalPages(): number {
    return Math.ceil(this.reunion.length / this.itemsPerPage);
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

  openUtilisateurModal(utilisateur: Utilsateur) {
    this.selectedUtilisateur = utilisateur;
    this.modalRef = this.bsModalService.show(this.utilisateurModal);
  }
  closeModalutilisateur() {
    this.bsModalService.hide();
  }

  getDisplayedRange(): string {
    const startIndex = (this.p - 1) * this.itemsPerPage + 1;
    const endIndex = Math.min(this.p * this.itemsPerPage, this.reunion.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.reunion.length} entrées`;
  }

  resetSearchQuery() {
    this.searchQuery = '';
  }
  getReunionData(
    id: number,
    titre: string,
    type_reunion: string,
    date_previsionnelle_reunion: string,
    date_realisation_reunion: string,
    presents: any,
    personnes_exterieurs: string,
    liste_diffusion: any,
    ordre_jour: string,
  ) {
    this.id = id;
    this.titre = titre;
    this.type_reunion = type_reunion;
    this.date_previsionnelle_reunion = date_previsionnelle_reunion;
    this.date_realisation_reunion = date_realisation_reunion;
    this.presents = presents;
    this.personnes_exterieurs = personnes_exterieurs;
    this.liste_diffusion = liste_diffusion;
    this.ordre_jour = ordre_jour;
  }


  get displayedRN(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.reunion.slice(startIndex, endIndex);
  }
  showColumn1: boolean = true;
  showColumn2: boolean = false;
  showColumn3: boolean = true;
  showColumn4: boolean = false;
  showColumn5: boolean = true;
  showColumn6: boolean = false;

  showColumn7: boolean = true;
  showColumn8: boolean = false;
  buttonClickedref = false;
  buttonClickedrefs = false;

  refreshTable(): void {
    this.buttonClickedref = !this.buttonClickedref;
    this.buttonClickedrefs = !this.buttonClickedref;

    this.showColumn1 = !this.showColumn1;
    this.showColumn2 = !this.showColumn2;
    this.showColumn3 = !this.showColumn3;
    this.showColumn4 = !this.showColumn4;
    this.showColumn5 = !this.showColumn5;
    this.showColumn6 = !this.showColumn6;
    this.showColumn7 = !this.showColumn7;
    this.showColumn8 = !this.showColumn8;
  }

  resetTable(): void {
    this.buttonClickedrefs = !this.buttonClickedrefs;
    this.buttonClickedref = !this.buttonClickedrefs;

    this.showColumn1 = !this.showColumn1;
    this.showColumn2 = !this.showColumn2;
    this.showColumn3 = !this.showColumn3;
    this.showColumn4 = !this.showColumn4;
    this.showColumn5 = !this.showColumn5;
    this.showColumn6 = !this.showColumn6;
    this.showColumn7 = !this.showColumn7;
    this.showColumn8 = !this.showColumn8;
  }

}
