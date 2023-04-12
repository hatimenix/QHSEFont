import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentationService } from 'src/app/Services/Service-documentation/documentation.service';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';
import { Secteur } from 'src/app/models/Secteur';

@Component({
  selector: 'app-add-secteur',
  templateUrl: './add-secteur.component.html',
  styleUrls: ['./add-secteur.component.css']
})
export class AddSecteurComponent {
  secteurForm!: FormGroup;
  document$ !: Observable<any>;
 
  constructor(private fb: FormBuilder, 
    private secteurService:  SecteurService,
    private documentService : DocumentationService,
     private router: Router,
     ) {
  }

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);

    this.secteurForm = this.fb.group({
      secteur_nom: ['', Validators.required],
      
    });
    this.document$ = this.documentService.getDocument();
   
  }
  onSubmit():void {
    const formData = this.secteurForm.value;
    const secteur: Secteur= new Secteur (
      formData.secteur_nom,
      
    );
      
    
    this.secteurService.addSecteur(secteur).subscribe(
      () => {      
        console.log("Le secteur a été ajouté avec succès");
        console.log(secteur);
        this.router.navigate(['/listSecteur']); 
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de l'ajout de secteur", error);        
      }
    );
  }
  
}
