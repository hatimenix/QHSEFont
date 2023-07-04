import { ConstatAuditService } from './../../../Services/Service-constatAudit/constat-audit.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
import { Processus } from 'src/app/models/pocesus';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';



@Component({
  selector: 'app-add-constat',
  templateUrl: './add-constat.component.html',
  styleUrls: ['./add-constat.component.css']
})
export class AddConstatComponent implements OnInit {
  filteredResponsables: any[] = [];

  constatAuditForm!: FormGroup;
  site$ !: Observable<any>;
  processuss$ !: Observable<any>;
  utilisateurs$ !: Observable<any>;
  responsable_traitement: number[] = [];
  droppedFile: File | null = null;
  rapport_audit: any


  searchControl = new FormControl('');

  filteredUtilisateurs!: any[];
  //modal
  @ViewChild('successModal', { static: true }) successModal: any;
  modalRef!: BsModalRef;

  constructor(private fb: FormBuilder, private constatAuditService: ConstatAuditService,
    private router: Router,
    private siteService: ApiSiteService,
    private processusService: ProcessusService,
    private userService: ApiUtilisateurService,
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
    this.processuss$ = this.processusService.getProcessus();
    this.utilisateurs$ = this.userService.getAllUtilsateur();

    this.createForm();

    // Subscribe to changes in the search query
    this.filteredUtilisateurs = [];

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
    this.constatAuditForm = this.fb.group({



      intitule_constat: [''],
      type_constat: [''],
      audit_associe: [''],
      site: [''],
      responsable_traitement: [''],
      processus: [''],
      date_reponse: [''],
      localisation: [''],
      type_audit: [''],
      rapport_audit: [''],
      description_constat: [''],



    });
  }
  onSubmit(): void {

    if (this.constatAuditForm.valid) {
      const formData = new FormData();
      formData.append('intitule_constat', this.constatAuditForm.get('intitule_constat')?.value);
      formData.append('type_constat', this.constatAuditForm.get('type_constat')?.value);
      formData.append('audit_associe', this.constatAuditForm.get('audit_associe')?.value);
      formData.append('site', this.constatAuditForm.get('site')?.value);
      formData.append('processus', this.constatAuditForm.get('processus')?.value);
      formData.append('date_reponse', this.constatAuditForm.get('date_reponse')?.value);
      formData.append('localisation', this.constatAuditForm.get('localisation')?.value);
      formData.append('type_audit', this.constatAuditForm.get('type_audit')?.value);
      formData.append('rapport_audit', this.constatAuditForm.get('rapport_audit')?.value);
      formData.append('description_constat', this.constatAuditForm.get('description_constat')?.value);
      this.responsable_traitement.forEach((responsable_traitementId: number) => {
        formData.append('responsable_traitement', responsable_traitementId.toString());

      })

      this.constatAuditService.addConstatAudit(formData).subscribe(
        (response) => {
          console.log('constat d"audit ajoutée', response);
          this.openModal();
          this.router.navigate(['/constatsaudit-list']);


          console.log("formdata", formData);

        },
        (error) => {
          console.error(error);
        }
      );
    }




  }

  isResponsableSelected(responsable_traitementId: number): boolean {
    return this.responsable_traitement.includes(responsable_traitementId);
  }


  onFileSelected(event: any, field: string) {
    const file: File = event.target.files[0];
    this.droppedFile = file;
    this.constatAuditForm.get(field)?.setValue(file);
  }



  toggleResponsable(responsable_traitementId: number): void {
    const index = this.responsable_traitement.indexOf(responsable_traitementId);
    if (index > -1) {
      this.responsable_traitement.splice(index, 1);
    } else {
      this.responsable_traitement.push(responsable_traitementId);
    }
  }
  //modal functions 
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
  }




  onDragOver(event: any, field: string) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
  }

  onDragLeave(event: any, field: string) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any, field: string) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    this.droppedFile = file;

    // Set the value of the corresponding field in your form
    this.constatAuditForm.get(field)?.setValue(file);

    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) {
      dropZone.innerHTML = file.name;
    }

    // Access the field parameter value here and perform any specific logic
    console.log(`File dropped in ${field}`);
  }
  onSearchQueryChange(searchQuery: string): void {
    this.utilisateurs$.subscribe((utilisateurs: any[]) => {
      this.filteredResponsables = utilisateurs.filter(responsable => {
        return responsable.nom.toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }


}
