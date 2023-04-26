import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { DocumentationService } from 'src/app/Services/Service-documentation/documentation.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';

@Component({
  selector: 'app-addt-documentation',
  templateUrl: './addt-documentation.component.html',
  styleUrls: ['./addt-documentation.component.css']
})
export class AddtDocumentationComponent implements OnInit{

  DocForm!: FormGroup;

  site$ !: Observable<any>;
  secteur$! : Observable<any>;
  processus$! : Observable<any>;


  constructor(private formBuilder: FormBuilder, private docService: DocumentationService, private router: Router,
    private siteService : ApiSiteService,
    private secteurService : SecteurService,
    private processusService : ProcessusService ) {
    this.DocForm = this.formBuilder.group({
      
      nom: ['', Validators.required],
      codification: ['', Validators.required],
      version: ['', Validators.required],
      date_approbation: ['', Validators.required],
      date_previsionnelle: ['', Validators.required],
      nv_version: ['', Validators.required],
      type_docs: ['', Validators.required],
      url_document: ['', Validators.required],
      site: ['', Validators.required],
      secteur: ['', Validators.required],
      processus: ['', Validators.required],
      
    });
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
    this.secteur$ = this.secteurService.getSecteur();
    this.processus$ = this.processusService.getProcessus();


  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.DocForm.get('url_document')?.setValue(file);
  }

  onSubmit() {
    if (this.DocForm.valid) {
      const formData = new FormData();
      formData.append('nom', this.DocForm.get('nom')?.value);
      formData.append('codification', this.DocForm.get('codification')?.value);
      formData.append('version', this.DocForm.get('version')?.value);
      formData.append('date_approbation', this.DocForm.get('date_approbation')?.value);
      formData.append('date_previsionnelle', this.DocForm.get('date_previsionnelle')?.value);
      formData.append('nv_version', this.DocForm.get('nv_version')?.value);
      formData.append('type_docs', this.DocForm.get('type_docs')?.value);
      formData.append('url_document', this.DocForm.get('url_document')?.value);
      formData.append('site', this.DocForm.get('site')?.value);
      formData.append('secteur', this.DocForm.get('secteur')?.value);
      formData.append('processus', this.DocForm.get('processus')?.value);
  
      this.docService.addDocumentFormData(formData).subscribe(
        (response) => {
          console.log('document ajouté avec succes', response);
        
          this.router.navigate(['/listdocument']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
