import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommandeSerService } from 'src/app/Services/Service-commandes/commande-ser.service';
import { Commande } from 'src/app/models/Commande';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit{
  myForm!: FormGroup;
 

  constructor(private fb: FormBuilder, private commandeService: CommandeSerService, private router: Router) {
    this.createForm();
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

    this.createForm()
  }

  createForm() {
    this.myForm = this.fb.group({
      date_commande: [''],
      type_commande: ['client'],
      quantite: [''],
      specificite_regime: ['Aucun'],
      specificite_texture: ['Aucun'],
      etat_commande: ['livre'],
    });
  }

  onSubmit() {
    const formData = this.myForm.value;
    const newCommande: Commande = {
      date_commande: formData.date_commande,
      type_commande: formData.type_commande,
      quantite: formData.quantite,
      specificite_regime: formData.specificite_regime,
      specificite_texture: formData.specificite_texture,
      id_commande: 0,
      etat_commande: formData.etat_commande,
     
    };
    this.commandeService.addCommande(newCommande).subscribe(
      (commande: Commande) => {
        
        console.log("la commande est ajouté avec succes")
        console.log(commande)
        
        this.router.navigate(['/listC']); 
      },
      (error: any) => {
        console.log('Une erreur s\'est produite lors de l\'ajout de la commande', error);
        
      }
    );
  }
}
