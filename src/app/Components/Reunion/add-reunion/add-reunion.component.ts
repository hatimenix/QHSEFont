import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ReunionService } from 'src/app/Services/Service-reunion/reunion.service';

@Component({
  selector: 'app-add-reunion',
  templateUrl: './add-reunion.component.html',
  styleUrls: ['./add-reunion.component.css']
})
export class AddReunionComponent implements OnInit {



  reunionForm!: FormGroup;
  site$ !: Observable<any>;

  searchControl = new FormControl('');

  //modal
  @ViewChild('successModal', { static: true }) successModal: any;
  modalRef!: BsModalRef;

  constructor(private fb: FormBuilder, private rs: ReunionService,
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
    this.reunionForm = this.fb.group({




      titre: [''],
      type_reunion: [''],
      date_previsionnelle_reunion: [''],
      date_realisation_reunion: [''],
      presents: [''],
      personnes_exterieurs: [''],
      liste_diffusion: [''],
      ordre_jour: [''],



    });
  }


  onSubmit(): void {

    if (this.reunionForm.valid) {
      const formData = new FormData();
      formData.append('titre', this.reunionForm.get('titre')?.value);
      formData.append('type_reunion', this.reunionForm.get('type_reunion')?.value);
      formData.append('date_previsionnelle_reunion', this.reunionForm.get('date_previsionnelle_reunion')?.value);
      formData.append('date_realisation_reunion', this.reunionForm.get('date_realisation_reunion')?.value);
      formData.append('presents', this.reunionForm.get('presents')?.value);
      formData.append('personnes_exterieurs', this.reunionForm.get('personnes_exterieurs')?.value);
      formData.append('liste_diffusion', this.reunionForm.get('liste_diffusion')?.value);
      formData.append('ordre_jour', this.reunionForm.get('ordre_jour')?.value);


      this.rs.addReunion(formData).subscribe(
        (response) => {
          console.log('Reunion ajoutée', response);
          this.openModal();
          this.router.navigate(['/reunion-list']);


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
