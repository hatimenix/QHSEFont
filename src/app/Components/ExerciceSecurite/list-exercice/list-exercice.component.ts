import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ExerciceSecuriteService } from 'src/app/Services/Service-exerciceSecurite/exercice-securite.service';
import { ExerciceSecurite } from 'src/app/models/ExerciceSecurite';
import { Site } from 'src/app/models/site';
declare var window: any;

@Component({
  selector: 'app-list-exercice',
  templateUrl: './list-exercice.component.html',
  styleUrls: ['./list-exercice.component.css']
})
export class ListExerciceComponent {



  labelText: any = "     Tout le monde a respecté la consigne de ne pas revenir en arrière sans autorisation"
  labelText2: any = "     Tout le monde a rejoint le point de rassemblement"

  labelText3: any = "Tout le monde a entendu le signal d'alarme"
  labelText4: any = "Mis en place d'un accueil à l'entrée du site pour guider les secours"
  labelText5: any = "Interdiction de faire entrer des usagers ou prestataire"
  labelText6: any = "Blocage des portails ou barrières d'accès en position ouverte"
  labelText7: any = "Appréciation de la situation d'urgence"
  labelText8: any = "Centralisation des renseignements vers un interlocuteur unique"
  labelText9: any = "Commentaire lié à l'appréciation de la situation d'urgence"
  labelText10: any = "Connaissance des moyens de lutte incendie"
  lb11: any = "Dégagement des moyens de lutte incendie"
  lb12: any = "Dégagement des issues de secours"



  @ViewChild('successModal', { static: true }) successModal: any;

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


  titre: any;
  type_reunion: any;
  date_previsionnelle_reunion: any;
  date_realisation_reunion: any;
  presents: any;
  personnes_exterieurs: any;
  liste_diffusion: any;
  ordre_jour: any;

  intitule: any;
  theme: any;
  date: any;
  scenario: any;
  animateurs: any;
  observateurs: any;
  duree: any;
  monde_signal_alarme: any;
  monde_evacuation: any;
  ascenseur_inutilise: any;
  evacuation_immediate: any;
  evacuation_bon_ordre: any;
  monde_ressemblement: any;
  monde_consigne: any;
  connaissance_incendie: any;
  degagement_incendie: any;
  materiel_operationnel: any;
  materiel_verifie: any;
  degagement_secours: any;
  acceuil_secours: any;
  mise_secours: any;
  interdiction_prestataire: any;
  blocage_portail: any;
  appreciation_urgence: any;
  commentaire_appreciation: any;
  centralisation_renseignements: any;
  commentaire: any;
  mesure: any;
  taux_conformite: any

  site: any

  exerSec: ExerciceSecurite[] = [];


  all_exersec: ExerciceSecurite[] = []

  myForm: any;
  frm: any;

  constructor(private execSecServ: ExerciceSecuriteService, private siteservice: ApiSiteService,
    private bsModalService: BsModalService


  ) {

  }

  form = new FormGroup({



    titre: new FormControl(''),
    type_reunion: new FormControl(''),
    date_previsionnelle_reunion: new FormControl(''),
    date_realisation_reunion: new FormControl(''),
    presents: new FormControl(''),
    personnes_exterieurs: new FormControl(''),
    liste_diffusion: new FormControl(''),
    ordre_jour: new FormControl(''),

    intitule: new FormControl(''),
    theme: new FormControl(''),
    date: new FormControl(''),
    scenario: new FormControl(''),
    animateurs: new FormControl(''),
    observateurs: new FormControl(''),
    duree: new FormControl(''),
    monde_signal_alarme: new FormControl(''),
    monde_evacuation: new FormControl(''),
    ascenseur_inutilise: new FormControl(''),
    evacuation_immediate: new FormControl(''),
    evacuation_bon_ordre: new FormControl(''),
    monde_ressemblement: new FormControl(''),
    monde_consigne: new FormControl(''),
    connaissance_incendie: new FormControl(''),
    degagement_incendie: new FormControl(''),
    materiel_operationnel: new FormControl(''),
    materiel_verifie: new FormControl(''),
    degagement_secours: new FormControl(''),
    acceuil_secours: new FormControl(''),
    mise_secours: new FormControl(''),
    interdiction_prestataire: new FormControl(''),
    blocage_portail: new FormControl(''),
    appreciation_urgence: new FormControl(''),
    commentaire_appreciation: new FormControl(''),
    centralisation_renseignements: new FormControl(''),
    commentaire: new FormControl(''),
    mesure: new FormControl(''),
    site: new FormControl('', [Validators.required]),
    taux_conformite: new FormControl(''),



  });

  loadData() {
    this.execSecServ.getExerciceSecurites().subscribe(
      (data: ExerciceSecurite[]) => {
        this.exerSec = data;
        // Close all sites
        this.sites.forEach(site => {
          site.expanded = false;
        });
      },
      (error) => {
        console.error('Error fetching Exercice securite:', error);
      }
    );
  }

  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }
  delete() {
    this.execSecServ.deleteExerciceSecurite(this.idTodelete).subscribe({
      next: (data) => {
        this.all_exersec = this.all_exersec.filter(_ => _.id != this.idTodelete)
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

  updateExerciceSecurite(): void {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('intitule', this.intitule);
    formData.append('theme', this.theme);
    formData.append('date', this.date);
    formData.append('scenario', this.scenario);
    formData.append('animateurs', this.animateurs);
    formData.append('observateurs', this.observateurs);
    formData.append('duree', this.duree);
    formData.append('monde_signal_alarme', this.monde_signal_alarme);
    formData.append('monde_evacuation', this.monde_evacuation);
    formData.append('ascenseur_inutilise', this.ascenseur_inutilise);
    formData.append('evacuation_immediate', this.evacuation_immediate);
    formData.append('evacuation_bon_ordre', this.evacuation_bon_ordre);
    formData.append('monde_ressemblement', this.monde_ressemblement);
    formData.append('monde_consigne', this.monde_consigne);
    formData.append('connaissance_incendie', this.connaissance_incendie);
    formData.append('degagement_incendie', this.degagement_incendie)
    formData.append('materiel_operationnel', this.materiel_operationnel);
    formData.append('materiel_verifie', this.materiel_verifie);
    formData.append('degagement_secours', this.degagement_secours);
    formData.append('acceuil_secours', this.acceuil_secours);
    formData.append('mise_secours', this.mise_secours);
    formData.append('interdiction_prestataire', this.interdiction_prestataire);
    formData.append('blocage_portail', this.blocage_portail);
    formData.append('appreciation_urgence', this.appreciation_urgence);
    formData.append('commentaire_appreciation', this.commentaire_appreciation);
    formData.append('centralisation_renseignements', this.centralisation_renseignements);
    formData.append('commentaire', this.commentaire);
    formData.append('mesure', this.mesure);

    formData.append('site', String(this.site));

    // You can continue appending the remaining attributes

    // Finally, you can use the formData as needed, such as sending it in an HTTP request


    this.execSecServ.update(this.id, formData)

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


    this.site$ = this.siteservice.getAllSite();

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );


    this.siteservice.getAllSite().subscribe(
      (data: any[]) => {
        this.sites = data;
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );




    this.loadData()
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0];





  }

  get totalPages(): number {
    return Math.ceil(this.exerSec.length / this.itemsPerPage);
  }

  get displayedES(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.exerSec.slice(startIndex, endIndex);
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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.exerSec.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.exerSec.length} entrées`;
  }


  resetSearchQuery() {
    this.searchQuery = '';
  }
  getESData(
    id: number,
    intitule: any,
    theme: any,
    site: any,
    date: any,
    scenario: any,
    animateurs: any,
    observateurs: any,
    duree: any,
    monde_signal_alarme: any,
    monde_evacuation: any,
    ascenseur_inutilise: any,
    evacuation_immediate: any,
    evacuation_bon_ordre: any,
    monde_ressemblement: any,
    monde_consigne: any,
    connaissance_incendie: any,
    degagement_incendie: any,
    materiel_operationnel: any,
    materiel_verifie: any,
    degagement_secours: any,
    acceuil_secours: any,
    mise_secours: any,
    interdiction_prestataire: any,
    blocage_portail: any,
    appreciation_urgence: any,
    commentaire_appreciation: any,
    centralisation_renseignements: any,
    commentaire: any,
    mesure: any,
  ) {
    this.id = id;
    this.intitule = intitule;
    this.theme = theme;
    this.site = site;

    this.date = date;
    this.scenario = scenario;
    this.animateurs = animateurs;
    this.observateurs = observateurs;
    this.duree = duree;
    this.monde_signal_alarme = monde_signal_alarme;
    this.monde_evacuation = monde_evacuation;
    this.ascenseur_inutilise = ascenseur_inutilise;
    this.evacuation_immediate = evacuation_immediate;
    this.evacuation_bon_ordre = evacuation_bon_ordre;
    this.monde_ressemblement = monde_ressemblement;
    this.monde_consigne = monde_consigne;
    this.connaissance_incendie = connaissance_incendie;
    this.degagement_incendie = degagement_incendie;
    this.materiel_operationnel = materiel_operationnel;
    this.materiel_verifie = materiel_verifie;
    this.degagement_secours = degagement_secours;
    this.acceuil_secours = acceuil_secours;
    this.mise_secours = mise_secours;
    this.interdiction_prestataire = interdiction_prestataire;
    this.blocage_portail = blocage_portail;
    this.appreciation_urgence = appreciation_urgence;
    this.commentaire_appreciation = commentaire_appreciation;
    this.centralisation_renseignements = centralisation_renseignements;
    this.commentaire = commentaire;
    this.mesure = mesure;
  }

  getRecordCount(site: any): number {
    const sitePlans = this.exerSec.filter(exsec => exsec.site === site.id);
    return sitePlans.length;
  }


}
