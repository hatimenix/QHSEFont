import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstatAuditService } from './../../../Services/Service-constatAudit/constat-audit.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { ConstatAudit } from 'src/app/models/constat-audit';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
import { Utilsateur } from 'src/app/models/utilsateur';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Site } from 'src/app/models/site';



declare var window: any;


@Component({
  selector: 'app-list-constats',
  templateUrl: './list-constats.component.html',
  styleUrls: ['./list-constats.component.css']
})
export class ListConstatsComponent implements OnInit {
  existingFileUrl: string = '';
  selectedUtilisateur: Utilsateur | undefined
  site$ !: Observable<any>;
  utilisateurs: any[] = [];

  modalRef!: BsModalRef;
  @ViewChild('successModal', { static: true }) successModal: any;
  @ViewChild('utilisateurModal', { static: true }) utilisateurModal: any;


  constatAudit: ConstatAudit[] = [];
  processuss: any[] = [];


  //search
  searchQuery: string = '';




  idTodelete: number = 0;

  deleteModal: any;
  all_constats: ConstatAudit[] = []




  id: any

  intitule_constat: any
  type_constat: any
  audit_associe: any
  site: any
  responsable_traitement: number[] = []
  processus: any
  date_reponse: any
  localisation: any
  type_audit: any
  rapport_audit: any
  description_constat: any

  form = new FormGroup({
    intitule_constat: new FormControl(''),
    type_constat: new FormControl('', [Validators.minLength(3)]),
    audit_associe: new FormControl('', [Validators.minLength(3)]),
    localisation: new FormControl('', [Validators.required]),
    type_audit: new FormControl(''),
    date_reponse: new FormControl(''),

    site: new FormControl(''),
    processus: new FormControl(''),
    responsable_traitement: new FormControl(''),

    rapport_audit: new FormControl(''),
    description_constat: new FormControl(''),


  });


  updateModalVisible: boolean = true


  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;


  myForm: any;



  get totalPages(): number {
    return Math.ceil(this.constatAudit.length / this.itemsPerPage);
  }

  get displayedConstats(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.constatAudit.slice(startIndex, endIndex);
  }

  constructor(private constatAuditService: ConstatAuditService, private processServ: ProcessusService,
    private bsModalService: BsModalService,
    private siteservice: ApiSiteService,
    private utilisateurservice: ApiUtilisateurService
  ) {

  }

  getSelectedFileName(): string {
    const fileInput = document.getElementById('customFile2') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      return fileInput.files[0].name;
    }
    return 'Choose file';
  }

  getFileNameFromUrl(url: string): string {
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    return decodeURIComponent(fileName); // Decode the URI component
  }

  updateFile(event: any) {
    this.rapport_audit = event.target.files[0];

  }
  loadData() {
    this.constatAuditService.getConstatAudits().subscribe(
      (data: ConstatAudit[]) => {
        this.constatAudit = data;
      }
    )
  }

  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }
  delete() {
    this.constatAuditService.deleteConstatAudit(this.idTodelete).subscribe({
      next: (data) => {
        this.all_constats = this.all_constats.filter(_ => _.id != this.idTodelete)
        location.reload()
        this.deleteModal.hide();
      },
      error: (err) => {
        console.log(err);
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

    this.processServ.getProcessus().subscribe(
      (data: any[]) => {
        this.processuss = data;
        console.log(this.processuss); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
    this.site$ = this.siteservice.getAllSite();
    this.utilisateurservice.getAllUtilsateur().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs);
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );



    this.loadData()
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0];
  }


  resetSearchQuery() {
    this.searchQuery = '';
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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.constatAudit.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.constatAudit.length} entrées`;
  }




  updateConstatAudit(): void {
    const formData = new FormData()
    formData.append('intitule_constat', this.intitule_constat);
    formData.append('type_constat', this.type_constat);
    formData.append('audit_associe', this.audit_associe);
    formData.append('site', this.site);
    formData.append('processus', this.processus);
    formData.append('date_reponse', this.date_reponse)
    formData.append('localisation', this.localisation);
    formData.append('type_audit', this.type_audit);
    formData.append('description_constat', this.description_constat);
    if (this.rapport_audit !== null && this.rapport_audit !== undefined) {
      formData.append("rapport_audit", this.rapport_audit);
    } this.responsable_traitement.forEach((responsable_traitementId: number) => {
      formData.append('responsable_traitement', responsable_traitementId.toString());

    })
    this.constatAuditService.update(this.id, formData)

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
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload();
  }
  isResponsableSelected(responsable_traitementId: number): boolean {
    return this.responsable_traitement.includes(responsable_traitementId);
  }
  toggleResponsable(responsable_traitementId: number): void {
    const index = this.responsable_traitement.indexOf(responsable_traitementId);
    if (index > -1) {
      this.responsable_traitement.splice(index, 1);
    } else {
      this.responsable_traitement.push(responsable_traitementId);
    }
  }



  getCAData(id: number,
    intitule_constat: any,
    type_constat: any, audit_associe: any, site: any, responsable_traitement: any, processus: any, date_reponse: any, localisation: any, type_audit: any, description_constat: any) {
    this.id = id;
    this.intitule_constat = intitule_constat;
    this.type_constat = type_constat;
    this.audit_associe = audit_associe;
    this.site = site;
    this.responsable_traitement = responsable_traitement;
    this.processus = processus;
    this.date_reponse = date_reponse;
    this.localisation = localisation;
    this.type_audit = type_audit;
    this.description_constat = description_constat;

  }



  openUtilisateurModal(utilisateur: Utilsateur) {
    this.selectedUtilisateur = utilisateur;
    this.modalRef = this.bsModalService.show(this.utilisateurModal);
  }
  closeModalutilisateur() {
    this.bsModalService.hide();
  }


  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.constatAudit.map((ca) => ({
      'ID': ca.id,
      'Intitule constat': ca.intitule_constat,
      'type_constat': ca.type_constat,
      'audit_associe': ca.audit_associe,
      'site': ca.site,
      'Responsable traitement': ca.responsable_traitement,
      'processus': ca.processus,
      'date_reponse': ca.date_reponse,
      'localisation': ca.localisation,
      'type_audit': ca.type_audit,
      'description_constat': ca.description_constat,

    })));
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const filename = 'paiperleck_constat_audit.xlsx';
    saveAs(blob, filename);
  }

  selectedSiteId: number | undefined;



  filterConstatBySite(): void {
    const selectedSite = parseInt(this.myForm.get('site')?.value);
    console.log(this.myForm.get('site')?.value)

    if (selectedSite) {

      this.constatAuditService.getConstatAudits().subscribe(
        (data: ConstatAudit[]) => {
          const ca = data;
          const filteredMenus = ca.filter(d => {
            const siteIds = Array.isArray(d.site) ? d.site.map((s: Site) => s.id) : [d.site];
            return siteIds.includes(selectedSite);
          });

          if (filteredMenus.length > 0) {
            this.selectedSiteId = selectedSite;
            this.constatAudit = filteredMenus;
          } else {
            console.log(`Aucun menu trouvé pour le site sélectionné: ${selectedSite}`);
            this.constatAudit = [];
          }

          console.log("menus filtrés", this.constatAudit);
          console.log("site sélectionné", this.selectedSiteId);
          console.log("liste des menus", this.constatAudit);
          console.log("menus length", this.constatAudit.length);

        },
        (error: any) => {
          console.log(error);
        }
      );

    } else {
      this.myForm.reset();
      this.selectedSiteId = undefined;
      console.log("id de ce site", this.selectedSiteId);
      this.loadData();
    }
  }
  selectedType: string = '';

  filterConstatByType(type: string): void {
    this.constatAuditService.getConstatAudits().subscribe(
      (data: ConstatAudit[]) => {
        const filteredConstats = data.filter((constat: ConstatAudit) => {
          return constat.type_constat === type;
        });

        if (filteredConstats.length > 0) {
          this.constatAudit = filteredConstats;
        } else {
          console.log(`No constat found for type: ${type}`);
          this.constatAudit = [];
        }

        console.log("Filtered constats:", this.constatAudit);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  resetSiteFilters(): void {
    // Reset the selected filters and reload the data
    this.selectedType = ''; // Reset the selected type filter
    this.myForm.reset(); // Reset the form and selected site filter
    this.loadData(); // Reload the data
  }
  resetFilters(): void {
    this.myForm.get('site')?.setValue(''); // Reset the site filter to empty value
    this.filterConstatBySite(); // Apply the filter based on the reset site value
  }

}
