import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Utilsateur } from 'src/app/models/utilsateur';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Taches } from 'src/app/models/taches';
import { ApiTachesService } from 'src/app/Services/Service-document-unique/api-taches.service';
import { SourceService } from 'src/app/Services/Service-Source/source.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
declare var window: any;

@Component({
  selector: 'app-list-taches',
  templateUrl: './list-taches.component.html',
  styleUrls: ['./list-taches.component.css']
})
export class ListTachesComponent {
  chartOptions: any;
  showChart = true; // Initially set to true to show the chart

  sources: any[] = [];
  utilisateurs: any[] = [];
  selectedUtilisateur: Utilsateur | undefined;  
  updateModalVisible: boolean = true;
  autoCloseDropdown: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any;
  @ViewChild('utilisateurModal', { static: true }) utilisateurModal:any;
  fieldsVisible: { [key: string]: boolean } = {
    nom_tache: true,
    echeance: true,
    assigne_a:true,
    priorite:true,
    etat:true,
  };
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.filteredTaches.length / this.itemsPerPage);
  }

  get displayedTaches(): Taches[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredTaches.slice(startIndex, endIndex);
  }
  id : any 
  nom_tache : any 
  date_debut : any
  echeance:any
  description:any
  priorite:any
  assigne_a:any
  date_realisation:any
  etat:any
  commentaire:any
  piece_jointe:any
  source:any

  searchQuery: string = '';
  taches : Taches[] = []
  originalTaches: Taches[] = [];
  filteredTaches: Taches[] = [];
  deleteModal: any;
  idTodelete: number = 0;
  form = new FormGroup({
    nom_tache: new FormControl(''),
    date_debut: new FormControl(''),
    echeance: new FormControl(''),
    description: new FormControl(''),
    priorite: new FormControl(''),
    assigne_a: new FormControl(''),
    date_realisation: new FormControl(''),
    etat: new FormControl(''),
    commentaire: new FormControl(''),
    piece_jointe: new FormControl(''),
    source: new FormControl(''),

  });
  constructor(private   tacheservice : ApiTachesService, private router : Router,private sourceservice :SourceService, private apiUtilisateurService: ApiUtilisateurService, private bsModalService: BsModalService){

  }
  ngOnInit(): void {
    this.apiUtilisateurService.getAllUtilsateur().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs); // Print the utilisateurs to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    ); 
    this.sourceservice.getAll().subscribe(
      (data: any[]) => {
        this.sources = data;
        console.log(this.sources);
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
    this.originalTaches = this.taches.slice(); // create a copy of the original list
    this.getTaches();
    this.fetchTachesData();

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
    document.addEventListener('click', this.onDocumentClick.bind(this));
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 
    

  }
  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }
  resetFilter() {
    this.filteredTaches = this.originalTaches;
  }
  
  getTaches() {
    this.tacheservice.getAllTaches().subscribe(
      res => {
        this.taches = res;
        this.originalTaches = res;
        this.filteredTaches = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  navigateToTache() {
    this.router.navigate(['/add-tache']);
  }
  navigateToSource() {
    this.router.navigate(['/add-sources']);
  }
  updateTache() : void {
    const formData =  new FormData()
    formData.append("assigne_a", this.assigne_a);
    formData.append("source", this.source);

    formData.append("nom_tache", this.nom_tache);
    if (this.date_debut !== null && this.date_debut !== undefined) {
      formData.append("date_debut", this.date_debut);
  }
  if (this.echeance !== null && this.echeance !== undefined) {
    formData.append("echeance", this.echeance);
}    
if (this.date_realisation !== null && this.date_realisation !== undefined) {
  formData.append("date_realisation", this.date_realisation);
}              
  formData.append("description", this.description);
    formData.append("priorite", this.priorite);
    formData.append("etat", this.etat);
    formData.append("commentaire", this.commentaire);
    if (this.piece_jointe !== null && this.piece_jointe !== undefined) {
      formData.append("piece_jointe", this.piece_jointe);
  }    

  this.tacheservice.updateTacheFormdata(this.id, formData)

  .subscribe({
      next: (res) => {
          console.log(res);
          this.openModal();
          this.updateModalVisible = false;
          this.closeSuccessModalAfterDelay();
      },
      error: (e) => {
          console.error(e);
      }
  });
}
getTacheData( id : number,
  nom_tache : any,
  date_debut : any  ,
  echeance : any , 
  description :any,
  priorite:any,
  assigne_a:any,
  date_realisation:any,
  etat:any,
  commentaire:any,
  source:any,

){
  this.id = id,
  this.nom_tache=nom_tache,
  this.date_debut = date_debut,
  this.echeance=echeance,
  this.description=description,
  this.priorite=priorite
  this.assigne_a=assigne_a,
  this.date_realisation=date_realisation,
  this.etat=etat,
  this.commentaire=commentaire,
  this.source=source
}
openDeleteModal(id: number) {
  this.idTodelete = id;
  this.deleteModal.show();
}


delete() {
  this.tacheservice.delTache(this.idTodelete).subscribe({
    next: (data) => {
      this.taches = this.taches.filter(_ => _.id != this.idTodelete)
      location.reload()
      this.deleteModal.hide();
    },
    error:(err) => {
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
updateFile(event: any) {
  this.piece_jointe = event.target.files[0];

}
download(piece_jointe: string): void {
  this.tacheservice.downloadFile(piece_jointe);
}
openUtilisateurModal(utilisateur: Utilsateur) {
  this.selectedUtilisateur = utilisateur;
  this.modalRef = this.bsModalService.show(this.utilisateurModal);
}
closeModalutilisateur(){
    this.bsModalService.hide();
}
resetSearchQuery() {
  this.searchQuery = '';
}
filterEnCours() {
  this.filteredTaches = this.originalTaches.filter(tache => tache.etat === 'En cours');
  this.sources.forEach((source) => {
    source.expanded = true;
  });
}

filterTermine() {
  this.filteredTaches = this.originalTaches.filter(tache => tache.etat === 'Terminé');
  this.sources.forEach((source) => {
    source.expanded = true;
  });
}

exportToExcel() {
  const worksheet = XLSX.utils.json_to_sheet(this.filteredTaches.map((tache) => ({
    'ID': tache.id,
    'Nom de la tâche': tache.nom_tache,
    'Echeance': tache.echeance,
    'Assigné à':tache.utilisateur_name,
    'Priorité':tache.priorite,
    'Etat':tache.etat,
  })));
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const filename = 'paiperleck_suivi_des_tâches.xlsx';
  saveAs(blob, filename);
}
getSelectedFileName(): string {
  const fileInput = document.getElementById('customFile2') as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    return fileInput.files[0].name;
  }
  return 'Choose file';
}
onDropdownClick(event: MouseEvent) {
  event.stopPropagation();
}

toggleDropdown() {
  this.autoCloseDropdown = !this.autoCloseDropdown;
}

onDocumentClick(event: MouseEvent) {
  this.autoCloseDropdown = true;
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.filteredTaches.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.filteredTaches.length} entrées`;
}
getRecordCount(source: any): number {
  const sourcePlans = this.taches.filter(tache => tache.source === source.id);
  return sourcePlans.length;
}
fetchTachesData() {
  this.tacheservice.getAllTaches().subscribe(
    (data) => {
      this.taches = data;
      this.chartOptions = {
        series: [
          {
            data: this.taches.map(tache => ({
              x: tache.nom_tache,
              y: [
                new Date(tache.date_debut).getTime(),
                new Date(tache.echeance).getTime()
              ],
              fillColor: '#00E396',
            }))
          }
        ],
        chart: {
          type: 'rangeBar'
        },
        xaxis: {
          type: 'datetime'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '20%',

          }
        }
      };
    },
    (error) => {
      console.error('Error fetching Taches data:', error);
    }
  );
}
toggleChartVisibility() {
  this.showChart = !this.showChart;
}
closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
    location.reload();
  }, 2300); 
}
}
