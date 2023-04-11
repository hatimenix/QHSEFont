import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentationService } from 'src/app/Services/Service-documentation/documentation.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { Documentation } from 'src/app/models/Documentation';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent {
  documentForm!: FormGroup;
  processus$ !: Observable<any>;
  

  constructor(private fb: FormBuilder, private documentService: DocumentationService,
     private router: Router,
     private processusService: ProcessusService) {
    
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

    this.documentForm = this.fb.group({
      nom: ['', Validators.required],
      codification: ['',Validators.required],
      version: ['',Validators.required],
      date_approbation:['',Validators.required],
      date_previsionnelle:['',Validators.required],
      nv_version: ['',Validators.required],
      
      type_docs: ['', Validators.required], 
      url_document:['',Validators.required],
      icon:[''], 
    });
    this.processus$ = this.processusService.getProcessus();
  }
  onSubmit():void {
    const formData = this.documentForm.value;
    const document: Documentation= new Documentation (
      formData.nom,
      formData.codification,
      formData.version,
      formData.date_approbation,
      formData.date_previsionnelle,
      formData.nv_version,
      formData.type_docs,
      formData.url_document,
      formData.icon, 
    );
      
    
    this.documentService.addDocument(document).subscribe(
      () => {      
        console.log("Le document a été ajouté avec succès");
        console.log(document);
        this.router.navigate(['/listdocuments']); 
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de l'ajout de document", error);        
      }
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.documentForm.get('url_document')?.setValue(file);
  }
}
