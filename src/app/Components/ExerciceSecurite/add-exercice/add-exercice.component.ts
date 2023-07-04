import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ExerciceSecuriteService } from 'src/app/Services/Service-exerciceSecurite/exercice-securite.service';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.css']
})
export class AddExerciceComponent implements OnInit {



  labelText: any = "     Tout le monde a respecté la consigne de ne pas revenir en arrière sans autorisation"
  labelText2: any = "     Tout le monde a rejoint le point de rassemblement"

  labelText3: any = "Tout le monde a entendu le signal d'alarme"
  labelText4: any = "Mis en place d'un accueil à l'entrée du site pour guider les secours"
  labelText5: any = "Interdiction de faire entrer des usagers ou prestataire"
  labelText6: any = "Blocage des portails ou barrières d'accès en position ouverte"
  labelText7: any = "Appréciation de la situation d'urgence"
  labelText8: any = "Centralisation des renseignements vers un interlocuteur unique"
  labelText9: any = "Commentaire lié à l'appréciation de la situation d'urgence"
  labelText10: any = ""

  exsecForm!: FormGroup;
  site$ !: Observable<any>;

  searchControl = new FormControl('');

  //modal
  @ViewChild('successModal', { static: true }) successModal: any;
  modalRef!: BsModalRef;

  constructor(private fb: FormBuilder, private exs: ExerciceSecuriteService,
    private router: Router,
    private siteService: ApiSiteService,
    private bsModalService: BsModalService,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('fr'); // Use the locale you desire

    this.createForm();

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
    this.site$ = this.siteService.getAllSite();

    this.createForm();

    // Subscribe to changes in the search query


  }

  createForm() {
    this.exsecForm = this.fb.group({




      intitule: [''],
      theme: [''],
      date: [''],
      scenario: [''],
      animateurs: [''],
      observateurs: [''],
      duree: [''],
      monde_signal_alarme: [''],
      monde_evacuation: [''],
      ascenseur_inutilise: [''],
      evacuation_immediate: [''],
      evacuation_bon_ordre: [''],
      monde_ressemblement: [''],
      monde_consigne: [''],
      connaissance_incendie: [''],
      degagement_incendie: [''],
      materiel_operationnel: [''],
      materiel_verifie: [''],
      degagement_secours: [''],
      acceuil_secours: [''],
      mise_secours: [''],
      interdiction_prestataire: [''],
      blocage_portail: [''],
      appreciation_urgence: [''],
      commentaire_appreciation: [''],
      centralisation_renseignements: [''],
      commentaire: [''],
      mesure: [''],

      site: ['', Validators.required],
      taux_conformite: [''],



    });
  }


  onSubmit(): void {

    if (this.exsecForm.valid) {
      const formData = new FormData();
      formData.append('titre', this.exsecForm.get('titre')?.value);
      formData.append('type_reunion', this.exsecForm.get('type_reunion')?.value);
      formData.append('date_previsionnelle_reunion', this.exsecForm.get('date_previsionnelle_reunion')?.value);
      formData.append('date_realisation_reunion', this.exsecForm.get('date_realisation_reunion')?.value);
      formData.append('presents', this.exsecForm.get('presents')?.value);
      formData.append('personnes_exterieurs', this.exsecForm.get('personnes_exterieurs')?.value);
      formData.append('liste_diffusion', this.exsecForm.get('liste_diffusion')?.value);
      formData.append('ordre_jour', this.exsecForm.get('ordre_jour')?.value);
      formData.append('intitule', this.exsecForm.get('intitule')?.value);
      formData.append('theme', this.exsecForm.get('theme')?.value);
      formData.append('date', this.exsecForm.get('date')?.value);
      formData.append('scenario', this.exsecForm.get('scenario')?.value);
      formData.append('animateurs', this.exsecForm.get('animateurs')?.value);
      formData.append('observateurs', this.exsecForm.get('observateurs')?.value);
      formData.append('duree', this.exsecForm.get('duree')?.value);
      formData.append('monde_signal_alarme', this.exsecForm.get('monde_signal_alarme')?.value);
      formData.append('monde_evacuation', this.exsecForm.get('monde_evacuation')?.value);
      formData.append('ascenseur_inutilise', this.exsecForm.get('ascenseur_inutilise')?.value);
      formData.append('evacuation_immediate', this.exsecForm.get('evacuation_immediate')?.value);
      formData.append('evacuation_bon_ordre', this.exsecForm.get('evacuation_bon_ordre')?.value);
      formData.append('monde_ressemblement', this.exsecForm.get('monde_ressemblement')?.value);
      formData.append('monde_consigne', this.exsecForm.get('monde_consigne')?.value);
      formData.append('connaissance_incendie', this.exsecForm.get('connaissance_incendie')?.value);
      formData.append('degagement_incendie', this.exsecForm.get('degagement_incendie')?.value);
      formData.append('materiel_operationnel', this.exsecForm.get('materiel_operationnel')?.value);
      formData.append('materiel_verifie', this.exsecForm.get('materiel_verifie')?.value);
      formData.append('degagement_secours', this.exsecForm.get('degagement_secours')?.value);
      formData.append('acceuil_secours', this.exsecForm.get('acceuil_secours')?.value);
      formData.append('mise_secours', this.exsecForm.get('mise_secours')?.value);
      formData.append('interdiction_prestataire', this.exsecForm.get('interdiction_prestataire')?.value);
      formData.append('blocage_portail', this.exsecForm.get('blocage_portail')?.value);
      formData.append('appreciation_urgence', this.exsecForm.get('appreciation_urgence')?.value);
      formData.append('commentaire_appreciation', this.exsecForm.get('commentaire_appreciation')?.value);
      formData.append('centralisation_renseignements', this.exsecForm.get('centralisation_renseignements')?.value);
      formData.append('commentaire', this.exsecForm.get('commentaire')?.value);
      formData.append('mesure', this.exsecForm.get('mesure')?.value);
      formData.append('site', this.exsecForm.get('site')?.value);
      formData.append('taux_conformite', this.exsecForm.get('taux_conformite')?.value);


      this.exs.addExerciceSecurite(formData).subscribe(
        (response) => {
          console.log('Exercice securité ajoutée', response);
          this.openModal();
          this.router.navigate(['/listExerciceSecurite']);


          console.log("formdata", formData);

        },
        (error) => {
          console.error(error);
        }
      );

    }





  }

  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
  }


}
