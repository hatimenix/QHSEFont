import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiTachesService } from 'src/app/Services/Service-document-unique/api-taches.service';
import { SourceService } from 'src/app/Services/Service-Source/source.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
@Component({
  selector: 'app-add-taches',
  templateUrl: './add-taches.component.html',
  styleUrls: ['./add-taches.component.css']
})
export class AddTachesComponent {
  utilisateurs: any[] = [];
  sources: any[] = [];
  droppedFile: File | null = null;
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  constructor(private   tacheservice : ApiTachesService, private router : Router,private sourceservice :SourceService, private apiUtilisateurService: ApiUtilisateurService, private bsModalService: BsModalService){

  }
  mode = 'list';
  tachef = {
    id: 1,
    nom_tache: '',
    date_debut:'',
    echeance:'',
    description:'',
    priorite:'',
    assigne_a:'',
    date_realisation:'',
    etat:'',
    commentaire:'',
    piece_jointe:'',
    source:'',

  };
  submitted = false;
  form = new FormGroup({
    nom_tache: new FormControl(''),
    date_debut: new FormControl(''),
    echeance: new FormControl(''),
    description: new FormControl(''),
    priorite: new FormControl(''),
    assigne_a: new FormControl(''),
    date_realisation: new FormControl(''),
    etat: new FormControl(''),
    commentaire: new FormControl(''),
    piece_jointe: new FormControl(''),
    source: new FormControl(''),

  });
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
    this.apiUtilisateurService.getAllUtilsateur().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs); // Print the utilisateurs to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    ); 
    this.sourceservice.getAll().subscribe(
      (data: any[]) => {
        this.sources = data;
        console.log(this.sources);
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
  
    
  }
  createTache() {
    const formData =  new FormData()
    formData.append("nom_tache", this.tachef.nom_tache);
    formData.append("assigne_a", this.tachef.assigne_a);
    formData.append("source", this.tachef.source);
    formData.append("date_debut", this.tachef.date_debut);
    formData.append("echeance", this.tachef.echeance);
    formData.append("assigne_a", this.tachef.assigne_a);
    formData.append("date_realisation", this.tachef.date_realisation);
    formData.append("description", this.tachef.description);
    formData.append("priorite", this.tachef.priorite);
    formData.append("etat", this.tachef.etat);
    formData.append("commentaire", this.tachef.commentaire);
    formData.append("piece_jointe", this.tachef.piece_jointe);
    this.tacheservice.addTacheFormData(formData).subscribe({

      next: (res) => {
        console.log(res);
        this.router.navigate(["/tache-list"])
        this.openModal();
        console.log(formData);
        this.submitted = true;
      },
      error: (e)  =>{  
      console.error(e);
      this.submitted = false;
    }
  })
}
get f() {
  return this.form.controls;
}

submit() {
  console.log(this.form.value);
}
openModal() {
  this.modalRef = this.bsModalService.show(this.successModal);
}
closeModal() {
  this.bsModalService.hide();
}
uploadFile(event: any) {
  const file = event.target.files[0];
  this.droppedFile = file;
  this.tachef.piece_jointe=file

}
onDragOver(event: any) {
  event.preventDefault();
  event.stopPropagation();
  event.dataTransfer.dropEffect = 'copy';
}

onDragLeave(event: any) {
  event.preventDefault();
  event.stopPropagation();
}

onDrop(event: any) {
  event.preventDefault();
  event.stopPropagation();
  const file = event.dataTransfer.files[0];
  this.droppedFile = file;
  this.tachef.piece_jointe=file;
  const dropZone = document.querySelector('.drop-zone');
  if (dropZone) {
    dropZone.innerHTML = file.name;
  }
  
}
}
