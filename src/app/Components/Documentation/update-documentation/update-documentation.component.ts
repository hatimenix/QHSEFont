import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { DocumentationService } from 'src/app/Services/Service-documentation/documentation.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';
import { Documentation } from 'src/app/models/Documentation';

@Component({
  selector: 'app-update-documentation',
  templateUrl: './update-documentation.component.html',
  styleUrls: ['./update-documentation.component.css']
})
export class UpdateDocumentationComponent {
  DocForm!: FormGroup;
  doc!: Documentation;
  id!: number;

  site$ !: Observable<any>;
  secteur$! : Observable<any>;
  processus$! : Observable<any>;
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private documentService: DocumentationService,
    private siteService : ApiSiteService,
    private secteurService : SecteurService,
    private processusService : ProcessusService) { 
    this.DocForm = new FormGroup({
      nom: new FormControl(),
      codification: new FormControl(),
      version: new FormControl(),
      date_approbation: new FormControl(),
      date_previsionnelle: new FormControl(),
      nv_version: new FormControl(),
      type_docs: new FormControl(),
      url_document: new FormControl(),
      site: new FormControl(),
      secteur: new FormControl(),
      processus: new FormControl(),
    });
  }
  
  ngOnInit() {
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
    this.secteur$ = this.secteurService.getSecteur();
    this.processus$ = this.processusService.getProcessus();
    //code
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.documentService.getDocumntById(this.id).subscribe(
        (data: Documentation) => {
          this.doc = data;
          this.DocForm = this.formBuilder.group({
            nom: [this.doc.nom, Validators.required],
            codification: [this.doc.codification, Validators.required],
            version: [this.doc.version, Validators.required],
            date_approbation: [this.doc.date_approbation, Validators.required],
            date_previsionnelle : [this.doc.date_previsionnelle , Validators.required],
            nv_version: [this.doc.nv_version, Validators.required],
            type_docs : [this.doc.type_docs , Validators.required],
            url_document: [this.doc.url_document, Validators.required],
            site: [this.doc.site, Validators.required],
            secteur: [this.doc.secteur, Validators.required],
            processus: [this.doc.processus, Validators.required],
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log("ID de document introuvable dans l'URL");
      this.DocForm = this.formBuilder.group({
        nom: ['', Validators.required],
        codification: ['', Validators.required],
        version: ['', Validators.required],
        date_approbation: ['', Validators.required],
        date_previsionnelle: ['', Validators.required],
        nv_version: ['', Validators.required],
        type_docs: ['', Validators.required],
        site: ['', Validators.required],
        secteur: ['', Validators.required],
        processus: ['', Validators.required],
        url_document: ['']
      });
    }
  }
  
  onSubmit() {
    console.log(this.DocForm.value);
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('nom', this.DocForm.get('nom')?.value);
    formData.append('codification', this.DocForm.get('codification')?.value);
    formData.append('version', this.DocForm.get('version')?.value);
    formData.append('date_approbation', this.DocForm.get('date_approbation')?.value);
    formData.append('date_previsionnelle', this.DocForm.get('date_previsionnelle')?.value);
    formData.append('nv_version', this.DocForm.get('nv_version')?.value);
    formData.append('type_docs', this.DocForm.get('type_docs')?.value);
    formData.append('site', this.DocForm.get('site')?.value);
    formData.append('secteur', this.DocForm.get('secteur')?.value);
    formData.append('processus', this.DocForm.get('processus')?.value);
  
    if (this.DocForm.get('url_document')?.value) {
      const file: File = this.DocForm.get('url_document')?.value;
      formData.append('url_document', file, file.name);
    }
  

    this.documentService.updateDocFormdata(formData).subscribe(
      (data: any) => {
        console.log(data);
        
        this.router.navigate(['/listdocument']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file: File = (fileInput.files as FileList)[0];
    this.DocForm.get('url_document')?.setValue(file);
  }
}
