import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';

import { Processus } from 'src/app/models/pocesus';



@Component({
  selector: 'app-update-processus',
  templateUrl: './update-processus.component.html',
  styleUrls: ['./update-processus.component.css']
})
export class UpdateProcessusComponent {
  processusForm!: FormGroup;
  personnel$ !: Observable<any>;
  processus: any;
  activatedRoute: ActivatedRoute ;
  id!: number;
  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  

  constructor(private fb: FormBuilder, private processusService: ProcessusService,
    private router: Router,
    private personnelService: PersonnelService,
    private bsModalService: BsModalService,
    private route: ActivatedRoute) {
    this.activatedRoute = route; // assign the activated route service
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
    

    this.processusForm = this.fb.group({
      id:[''],
      intitule: ['', Validators.required],
      sigle: ['',Validators.required],
      typologie: ['',Validators.required],
      finalite:['',Validators.required],
      pilote:['', Validators.required],
      acteurs: ['',Validators.required],
      donnee_entree:['',Validators.required],
      activites: ['', Validators.required], 
      donnee_sortie:['',Validators.required],
      ressources_tech_org:['',Validators.required],
      objectifs_ind:['',Validators.required],
      outils_surveil:['',Validators.required],
      
    });

    this.personnel$ = this.personnelService.getPersonnels();

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.processusService.getProcessusById(this.id).subscribe(
        (data: Processus) => {
          this.processus = data;
          this.processusForm.patchValue({
            id: this.processus.id,
            intitule: this.processus.intitule,
            sigle: this.processus.sigle,
            typologie: this.processus.typologie,
            finalite: this.processus.finalite,
            pilote: this.processus.pilote,
            acteurs: this.processus.acteurs,
            donnee_entree: this.processus.donnee_entree,
            activites: this.processus.activites,
            donnee_sortie: this.processus.donnee_sortie,
            ressources_tech_org: this.processus.ressources_tech_org,
            objectifs_ind: this.processus.objectifs_ind,
            outils_surveil: this.processus.outils_surveil
            
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log("ID de processus introuvable dans l'URL");
    }
    

    }

    

  onSubmit():void {
    const formData = this.processusForm.value;
    const processus: Processus= new Processus (
      formData.intitule,
      formData.sigle,
      formData.typologie,
      formData.finalite,
      formData.pilote,
      formData.acteurs,
      formData.donnee_entree,
      formData.activites,
      formData.donnee_sortie,
      formData.ressources_tech_org,
      formData.objectifs_ind,
      formData.outils_surveil,
      
    );
      
    
    this.processusService.updateProcessus(this.processus.id, processus).subscribe(
      () => {      
        console.log("Le processus a été modifié avec succès");
        console.log(processus);
        this.openModal();
        this.router.navigate(['/listProcessus']); 
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de l'ajout de processus", error);        
      }
    );
  }
  //modal functions
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}
}
