import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ReunionService } from 'src/app/Services/Service-reunion/reunion.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';

@Component({
  selector: 'app-add-reunion',
  templateUrl: './add-reunion.component.html',
  styleUrls: ['./add-reunion.component.css']
})
export class AddReunionComponent implements OnInit {

  utilisateurs$ !: Observable<any>;
  presents: number[] = [];
  liste_diffusion: number[] = [];

  reunionForm!: FormGroup;
  site$ !: Observable<any>;

  searchControl = new FormControl('');
  searchControl2 = new FormControl('');

  filteredUtilisateurs!: any[];
  filteredPresents: any[] = [];

  filteredListeDiffusion: any[] = [];

  //modal
  @ViewChild('successModal', { static: true }) successModal: any;
  modalRef!: BsModalRef;

  constructor(private fb: FormBuilder, private rs: ReunionService,
    private router: Router,
    private siteService: ApiSiteService,
    private bsModalService: BsModalService,
    private localeService: BsLocaleService,
    private userService: ApiUtilisateurService,
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
    this.utilisateurs$ = this.userService.getAllUtilsateur();

    this.filteredUtilisateurs = [];

    this.createForm();

    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(searchQuery => {
        if (searchQuery !== null) {
          this.filterUtilisateurs(searchQuery);
        }
      });

    this.searchControl2.valueChanges
      .pipe(
        startWith(''),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(searchQuery => {
        if (searchQuery !== null) {
          this.filterUtilisateurs(searchQuery);
        }
      });

    // Subscribe to changes in the search query


  }

  filterUtilisateurs(searchQuery: string): void {
    this.utilisateurs$.subscribe((utilisateurs: any[]) => {
      this.filteredUtilisateurs = utilisateurs.filter(
        (responsable_traitement: any) =>
          responsable_traitement?.nom.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }



  createForm() {
    this.reunionForm = this.fb.group({




      titre: ['', Validators.required],
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

      this.presents.forEach((presid: number) => {
        formData.append('presents', presid.toString());

      })
      this.liste_diffusion.forEach((presid: number) => {
        formData.append('liste_diffusion', presid.toString());

      })


      formData.append('personnes_exterieurs', this.reunionForm.get('personnes_exterieurs')?.value);
      formData.append('ordre_jour', this.reunionForm.get('ordre_jour')?.value);


      this.rs.addReunion(formData).subscribe(
        (response) => {
          console.log('Reunion ajoutée', response);
          this.openModal();
          this.router.navigate(['/listReunion']);


          console.log("formdata", formData);

        },
        (error) => {
          console.error(error);
        }
      );
    }




  }


  isPresentsSelected(prid: number): boolean {
    return this.presents.includes(prid);
  }

  togglePresents(presentsId: number): void {
    const index = this.presents.indexOf(presentsId);
    if (index > -1) {
      this.presents.splice(index, 1);
    } else {
      this.presents.push(presentsId);
    }
  }

  isListeDiffSelected(prid: number): boolean {
    return this.liste_diffusion.includes(prid);
  }

  toggleListeDiff(listediffId: number): void {
    const index = this.liste_diffusion.indexOf(listediffId);
    if (index > -1) {
      this.liste_diffusion.splice(index, 1);
    } else {
      this.liste_diffusion.push(listediffId);
    }
  }

  onSearchQueryChange(searchQuery: string): void {
    this.utilisateurs$.subscribe((utilisateurs: any[]) => {
      this.filteredPresents = utilisateurs.filter(responsable => {
        return responsable.nom.toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }

  onSearchQueryChangeDiff(searchQuery: string): void {
    this.utilisateurs$.subscribe((utilisateurs: any[]) => {
      this.filteredListeDiffusion = utilisateurs.filter(responsable => {
        return responsable.nom.toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }


  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
  }


}
