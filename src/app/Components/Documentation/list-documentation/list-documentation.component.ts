import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { DocumentationService } from 'src/app/Services/Service-documentation/documentation.service';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';

import { Documentation } from 'src/app/models/Documentation';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-list-documentation',
  templateUrl: './list-documentation.component.html',
  styleUrls: ['./list-documentation.component.css']
})
export class ListDocumentationComponent implements OnInit {
  document: Documentation[] = [];
  site$!: Observable<any>;
  secteur$!: Observable<any>;
  sites!: Site[];
  myForm: any;
  selectedSiteId: number | undefined;
  site!: Site[];




  constructor(
    private documentService: DocumentationService,
    private siteService: ApiSiteService,
    private secteurService: SecteurService,
  ) {}

  ngOnInit(): void {
    this.loaddocument();
    this.site$ = this.siteService.getAllSite();
    this.secteur$ = this.secteurService.getSecteur();
    this.myForm = new FormGroup({
      site: new FormControl()
    });
    
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

  getSites(): void {
    this.siteService.getAllSite().subscribe((sites) => {
      this.sites = sites;
    });
  }

  // ajout de la méthode filterDocuments
  filterDocuments(): void {
    const selectedSite = parseInt(this.myForm.get('site')?.value);
  
    if (selectedSite) {
      console.log("selected site", selectedSite);
      console.log("this document", this.document);
      this.documentService.getDocuments().subscribe(
        (data: Documentation[]) => {
          
          this.document = data;
          const filteredDocuments = this.document.filter(d => {
            const siteIds = Array.isArray(d.site) ? d.site.map((s: Site) => s.id) : [d.id];
            return siteIds.some(siteId => siteId === selectedSite);
          });
  
          if (filteredDocuments.length > 0) {
            this.selectedSiteId = selectedSite;
            this.document = filteredDocuments;
          } else {
            console.log(`Aucun document trouvé pour le site sélectionné: ${selectedSite}`);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  
    } else {
      this.myForm.reset();
      this.selectedSiteId = undefined;
      console.log("id de ce site", this.selectedSiteId)
      this.loaddocument();
    }
  }
  
  
  
  
  
  
}
