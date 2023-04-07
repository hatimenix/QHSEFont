import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';
import { Secteur } from 'src/app/models/Secteur';

@Component({
  selector: 'app-update-secteur',
  templateUrl: './update-secteur.component.html',
  styleUrls: ['./update-secteur.component.css']
})
export class UpdateSecteurComponent implements OnInit{
  secteurForm!: FormGroup;
  activatedRoute: ActivatedRoute;
  secteur: any;
  id!: number;
  

  constructor(private fb: FormBuilder, private secteurService: SecteurService,
    private router: Router,
    
    private route: ActivatedRoute) {
    this.activatedRoute = route; // assign the activated route service
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
    

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.secteurService.getSecteurById(this.id).subscribe(
        (data: Secteur) => {
          this.secteur = data;
          this.secteurForm.patchValue({
            id: this.secteur.id,
            secteur_nom: this.secteur.secteur_nom,
           
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log("ID de secteur introuvable dans l'URL");
    }
    }
  onSubmit():void {
    const formData = this.secteurForm.value;
    const secteur: Secteur= new Secteur (
      formData.secteur_nom,
      
    );
    this.secteurService.updateSecteur(this.secteur.id, secteur).subscribe(
      () => {      
        console.log("Le secteur a été modifié avec succès");
        console.log(secteur);
        this.router.navigate(['/listSecteur']); 
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de la modification de secteur", error);        
      }
    );
  }
}
