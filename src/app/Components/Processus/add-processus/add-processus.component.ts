import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { Processus } from 'src/app/models/pocesus';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-processus',
  templateUrl: './add-processus.component.html',
  styleUrls: ['./add-processus.component.css']
})
export class AddProcessusComponent implements OnInit{
  processusForm!: FormGroup;
  personnel$ !: Observable<any>;
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;

  constructor(private fb: FormBuilder, private processusService: ProcessusService,
     private router: Router,
     private personnelService: PersonnelService,
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

    
    this.personnel$ = this.personnelService.getPersonnels();
    this.createForm();
  }

  createForm(){
    this.processusForm = this.fb.group({
      intitule: ['', Validators.required],
      sigle: ['',Validators.required],
      typologie: ['',Validators.required],
      finalite:['',Validators.required],
      pilote:['',Validators.required],
      acteurs: ['',Validators.required],
      donnee_entree:['',Validators.required],
      activites: ['', Validators.required], 
      donnee_sortie:['',Validators.required],
      ressources_tech_org:['',Validators.required],
      objectifs_ind:['',Validators.required],
      outils_surveil:['',Validators.required],
      
    });
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
      
    
    this.processusService.addProcessus(processus).subscribe(
      () => {      
        console.log("Le processus a été ajouté avec succès");
        console.log(processus);
        this.openModal();
        this.router.navigate(['/listProcessus']); 
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de l'ajout de processus", error);        
      }
    );
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}
  
}
