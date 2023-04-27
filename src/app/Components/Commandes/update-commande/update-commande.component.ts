import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommandeSerService } from 'src/app/Services/Service-commandes/commande-ser.service';
import { Commande } from 'src/app/models/Commande';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-commande',
  templateUrl: './update-commande.component.html',
  styleUrls: ['./update-commande.component.css']
})
export class UpdateCommandeComponent implements OnInit{
  myForm!: FormGroup;
  commande!: Commande;
  commandeId!: number;
  formBuilder: any;
  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;


  constructor(
    private fb: FormBuilder,
    private commandeService: CommandeSerService,
    private router: Router,
    private route: ActivatedRoute,
    private bsModalService: BsModalService
  ) {
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
  
   

    this.route.params.subscribe(params => {
      this.commandeId = params['id_commande'];
      this.commandeService.getCommandeById(this.commandeId).subscribe(
        (commande: Commande) => {
          console.log('Commande:', commande);
          this.commande = commande;
          this.myForm.setValue({
            type_commande: this.commande.type_commande ,
            quantite: this.commande.quantite ,
            specificite_regime: this.commande.specificite_regime ,
            specificite_texture: this.commande.specificite_texture,
            date_commande: this.commande.date_commande,
            etat_commande: this.commande.etat_commande 
          });
        },
        error => console.log(error)
      );
      

    });
  }
  
  

  createForm() {
    this.myForm = this.fb.group({
      date_commande: ['', Validators.required],
      type_commande: ['', Validators.required],
      quantite: ['', Validators.required],
      specificite_regime: ['', Validators.required],
      specificite_texture: ['', Validators.required],
      etat_commande: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.commandeId) {
      const updatedCommande: Commande = {
        id_commande: this.commandeId,
        date_commande: this.myForm.value.date_commande,
        type_commande: this.myForm.value.type_commande,
        quantite: this.myForm.value.quantite,
        specificite_regime: this.myForm.value.specificite_regime,
        specificite_texture: this.myForm.value.specificite_texture,
        etat_commande: this.myForm.value.etat_commande
      };
      this.commandeService.updateCommande(updatedCommande).subscribe(
        (commande: Commande) => {
          console.log('Commande updated successfully!');
          this.openModal();
          this.router.navigate(['/listC']);
        },
        error => console.log(error)
      );
    } else {
      console.log('Commande ID is undefined!');
    }

    
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}


}

