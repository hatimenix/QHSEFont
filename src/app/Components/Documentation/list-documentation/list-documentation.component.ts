import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { DocumentationService } from 'src/app/Services/Service-documentation/documentation.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';

import { Documentation } from 'src/app/models/Documentation';
import { Secteur } from 'src/app/models/Secteur';
import { Processus } from 'src/app/models/processus';
import { Site } from 'src/app/models/Site';

@Component({
  selector: 'app-list-documentation',
  templateUrl: './list-documentation.component.html',
  styleUrls: ['./list-documentation.component.css']
})
export class ListDocumentationComponent implements OnInit {
  searchQuery: string = '';
  document: Documentation[] = [];
  myForm: any;
  site$!: Observable<any>;
  secteur$!: Observable<any>;
  processus$!: Observable<any>;
  //variables pour le filtrage 
  sites!: any[];
  selectedSiteId: number | undefined;
  selectedSecteurId: number | undefined;
  secteur!: Secteur[];
  selectedProcessusId: number | undefined;
  processus  : any[] = [];
  typeDocumentSelectionne !:string

  //filtrage
  showPopover: boolean = false;

  filterField: string = '';
  fieldSearchQuery: string = '';
  filteredDocuments: Documentation[] = [];
  selectedDocument: Documentation[] = [];
   //modal
   @ViewChild('deleteModal', { static: true }) deleteModal!: any;
   modalRef!: BsModalRef;
   DocIdToDelete: number = 0;
constructor(
    private documentService: DocumentationService,
    private siteService: ApiSiteService,
    private secteurService: SecteurService,
    private processusService: ProcessusService,
    public modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.processusService.getProcessus().subscribe(
      (data: any[]) => {
        this.processus = data.map(item => ({ ...item, expanded: true }));
        console.log(this.processus); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );

    this.loaddocument();
    this.site$ = this.siteService.getAllSite();
    this.secteur$ = this.secteurService.getSecteur();
    this.processus$ = this.processusService.getProcessus();
    this.myForm = new FormGroup({
      site: new FormControl(),
      secteur: new FormControl(),
      type_docs : new FormControl(), 
      processus : new FormControl
    });

     //pagination 
     this.itemsPerPageOptions = [5, 10, 15];
     this.itemsPerPage = this.itemsPerPageOptions[0]; 
     
  }


  loaddocument() {
    this.documentService.getDocuments().subscribe(
      res => {
        this.document = res;
        this.filteredDocuments = res; 

      },
      error => {
        console.log(error);
      }
    );
  }

  deleteDocument(id: number): void {
    this.documentService.deleteDocument(id).subscribe(() => {
      this.document = this.document.filter((d) => d.id !== id);
    });
  }

  //url document 
  downloadURL(id: number): void {
    this.documentService.downloadURL(id).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const filename = response.fichier.split('/').pop();
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  //delete Modal 
  confirmDelete(): void {
    this.documentService.deleteDocument(this.DocIdToDelete)
      .subscribe(() => {
        this.document = this.document.filter(d=> d.id !== this.DocIdToDelete);
        this.modalRef.hide();
      });
  }
    declineDelete(): void {
    this.modalRef.hide();
    }
  
  
  //afficher juste le nom du fichier 
getFileNameFromPath(filePath: string | File | undefined): string {
  if (!filePath) return 'Aucun fichier joint';
  
  if (typeof filePath === 'string') {
    const parts = filePath.split('/');
    return parts.pop() || 'Aucun fichier joint';
  }
  
  return filePath.name || 'Aucun fichier joint';
}
resetSearchQuery() {
  this.searchQuery = '';
}


//pagination methods 
itemsPerPageOptions: number[] = [5, 10, 15];
itemsPerPage: number = this.itemsPerPageOptions[0];
p: number = 1;
get totalPages(): number {
  return Math.ceil(this.document.length / this.itemsPerPage);
}

get displayedDocuments(): Documentation[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.filteredDocuments.slice(startIndex, endIndex);
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
  const endIndex = Math.min(this.p * this.itemsPerPage, this.document.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.document.length} entrées`;
}




//fonction filtrage 
filterByField(fieldName: string): void {
  this.filterField = fieldName;
  this.togglePopover();
  this.searchQuery = '';
}
applyFieldFilter(): void {
  const searchValue = this.fieldSearchQuery?.toLowerCase();

  this.filteredDocuments = this.document.filter((doc) => {
    const fieldValue = doc[this.filterField]?.toLowerCase();

    if (fieldValue && searchValue) {
      return fieldValue.includes(searchValue);
    }

    return true;
  });
}

resetTable(): void {
  if (this.fieldSearchQuery && this.filteredDocuments.length === 0) {
    this.fieldSearchQuery = ''; 
    this.filterField = '';
    this.filteredDocuments = this.document;
  }
}
 
togglePopover() {
  this.showPopover = !this.showPopover;
}
closePopover(): void {
  this.showPopover = false;
}
handleReset(): void {
  
  this.resetTable();
  this.closePopover();
  const isFirstVisit = history.state.isFirstVisit;
  if (!isFirstVisit) {
    history.replaceState({ isFirstVisit: true }, '');
    location.reload();
  }
  window.scrollTo(0, 0);
}




}