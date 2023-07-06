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
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-list-documentation',
  templateUrl: './list-documentation.component.html',
  styleUrls: ['./list-documentation.component.css']
})
export class ListDocumentationComponent implements OnInit {
  searchQuery: string = '';
  document: Documentation[] = [];
  myForm: any;
  filteredDocuments: Documentation[] = [];
  site$!: Observable<any>;
  secteur$!: Observable<any>;
  processus$!: Observable<any>;
  //variables pour le filtrage 
  sites!: Site[];
  selectedSiteId: number | undefined;
  site!: Site[];
  selectedSecteurId: number | undefined;
  secteur!: Secteur[];
  selectedProcessusId: number | undefined;
  processus  : any[] = [];

//filtrage par type de document
  typeDocSelectionne!: string;

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
        this.processus = data;
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
      (data: Documentation[]) => {
        this.document = data;
        console.log(data)
      },
      (error: any) => {
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

 

 // Fonction de filtrage 
 //filtrage par site
filterDocumentsBySite(): void {
  const selectedSite = parseInt(this.myForm.get('site')?.value);

  if (selectedSite) {

    this.documentService.getDocuments().subscribe(
      (data: Documentation[]) => {
        const document = data;
        const filteredDocuments = document.filter(d => {
          const siteIds = Array.isArray(d.site) ? d.site.map((s: Site) => s.id) : [d.site];
          return siteIds.includes(selectedSite);
        });

        if (filteredDocuments.length > 0) {
          this.selectedSiteId = selectedSite;
          this.document = filteredDocuments;
        } else {
          console.log(`Aucun document trouvé pour le site sélectionné: ${selectedSite}`);
          this.document = [];
        }

        console.log("documents filtrés", this.document);
        console.log("site sélectionné", this.selectedSiteId);
        console.log("liste des documents", this.document);
        console.log("document length", this.document.length);

      },
      (error: any) => {
        console.log(error);
      }
    );

  } else {
    this.myForm.reset();
    this.selectedSiteId = undefined;
    console.log("id de ce site", this.selectedSiteId);
    this.loaddocument();
  }
}

//filtrage par secteur 

filterDocumentsBySecteur(): void {
  const selectedSecteur = parseInt(this.myForm.get('secteur')?.value);

  if (selectedSecteur) {

    this.documentService.getDocuments().subscribe(
      (data: Documentation[]) => {
        const document = data;
        const filteredDocuments = document.filter(d => {
          const secteurIds = Array.isArray(d.secteur) ? d.secteur.map((s: Secteur) => s.id) : [d.secteur];
          return secteurIds.includes(selectedSecteur);
        });

        if (filteredDocuments.length > 0) {
          this.selectedSecteurId = selectedSecteur;
          this.document = filteredDocuments;
        } else {
          console.log(`Aucun document trouvé pour le secteur sélectionné: ${selectedSecteur}`);
          this.document = [];
        }

        console.log("documents filtrés", this.document);
        console.log("secteur sélectionné", this.selectedSecteurId);
        console.log("liste des documents", this.document);
        console.log("document length", this.document.length);

      },
      (error: any) => {
        console.log(error);
      }
    );

  } else {
    this.myForm.reset();
    this.selectedSecteurId = undefined;
    console.log("id de ce secteur", this.selectedSecteurId);
    this.loaddocument();
  }
}
//filtrage par processus
filterDocumentsByProcessus():void{
  
  const selectedProcessus = parseInt(this.myForm.get('processus')?.value);

  if (selectedProcessus) {

    this.documentService.getDocuments().subscribe(
      (data: Documentation[]) => {
        const document = data;
        const filteredDocuments = document.filter(d => {
          const processusIds = Array.isArray(d.processus) ? d.processus.map((p: Processus) => p.id) : [d.processus];
          return processusIds.includes(selectedProcessus);
        });

        if (filteredDocuments.length > 0) {
          this.selectedProcessusId = selectedProcessus;
          this.document = filteredDocuments;
        } else {
          console.log(`Aucun document trouvé pour le processus sélectionné: ${selectedProcessus}`);
          this.document = [];
        }

        console.log("documents filtrés", this.document);
        console.log("processus sélectionné", this.selectedProcessusId);
        console.log("liste des documents", this.document);
        console.log("document length", this.document.length);

      },
      (error: any) => {
        console.log(error);
      }
    );

  } else {
    this.myForm.reset();
    this.selectedProcessusId = undefined;
    console.log("id de ce processus", this.selectedProcessusId);
    this.loaddocument();
  }
}
//filtrage par type de document 
filterDocumentByType(): void {
  if (this.typeDocSelectionne) {
    this.documentService.getDocuments().subscribe((document) => {
      this.document = document.filter((f) => f.type_docs === this.typeDocSelectionne);
    });
  } else {
    this.loaddocument();
  }
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

get displayedDocuments(): any[] {
  const startIndex = (this.p - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.document.slice(startIndex, endIndex);
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
}