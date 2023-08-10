import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandeSerService } from 'src/app/Services/Service-commandes/commande-ser.service';
import { Commande } from 'src/app/models/Commande';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit{
  myForm!: FormGroup;
  //modal traitement
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  site$ !: Observable<any>;

 

  constructor(private fb: FormBuilder, private commandeService: CommandeSerService, 
    private router: Router,
    private bsModalService: BsModalService, private siteService : ApiSiteService) {
    this.createForm();
  }

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);

    this.createForm()

    this.site$ = this.siteService.getAllSite();

  }

  createForm() {
    this.myForm = this.fb.group({
      site:[''],

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
      site: formData.site,
      site_name: ''
    };
    this.commandeService.addCommande(newCommande).subscribe(
      (commande: Commande) => {
        console.log("la commande est ajouté avec succes")
        console.log(commande)
        //modal
        this.openModal();
       
        this.router.navigate(['/listC']); 
      },
      (error: any) => {
        console.log('Une erreur s\'est produite lors de l\'ajout de la commande', error);
      }
    );
  }
  //modal traitement
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}


  
}