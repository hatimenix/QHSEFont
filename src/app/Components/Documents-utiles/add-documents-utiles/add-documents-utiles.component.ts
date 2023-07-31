import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceDocumentUtilesService } from 'src/app/Services/Services-document-utile/services-document-utile.service';
import { ApiUtilisateurService } from 'src/app/Services/Services-non-confirmité/api-utilisateur.service';
@Component({
  selector: 'app-add-documents-utiles',
  templateUrl: './add-documents-utiles.component.html',
  styleUrls: ['./add-documents-utiles.component.css']
})
export class AddDocumentsUtilesComponent implements OnInit{
  documents: any[] = [];
  utilisateurs: any[] = [];
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  droppedFile: File | null = null;
  constructor(private   documentutileservice : ServiceDocumentUtilesService , private router : Router, private apiUtilisateurService: ApiUtilisateurService, private bsModalService: BsModalService){}
  mode = 'list';
  documentutilef = {
    id: 1,
    document: '',
    nom:'',
    typologie:'',
    modified_by:''

}
submitted = false;
form = new FormGroup({
  document: new FormControl(''),
  nom: new FormControl('', [Validators.minLength(3),Validators.maxLength(40),this.checkDuplicateNom.bind(this)]),
  typologie: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
  modified_by: new FormControl(''),



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
      console.log(this.utilisateurs); // Print the sites to the console
    },
    (error: any) => {
      console.log(error); // Handle error
    }
  ); 
  this.documentutileservice.getAll().subscribe(
    (data: any[]) => {
      this.documents = data;
    },
    (error: any) => {
      console.log(error); // Handle error
    }
  );
}
createDocumentutile() {
    
  const formData =  new FormData()
  formData.append("document", this.documentutilef.document);
  formData.append("nom", this.documentutilef.nom);
  formData.append("typologie", this.documentutilef.typologie);
  formData.append("modified_by", this.documentutilef.modified_by);

  this.documentutileservice.create(formData).subscribe({

    next: (res) => {
      console.log(res);
      this.router.navigate(["/documents-utiles-list"])
      this.openModal();
      this.closeSuccessModalAfterDelay();
      console.log(formData);
      this.submitted = true;
    },
    error: (e)  =>{  
    console.error(e);
    this.submitted = false;
  }
})
}
uploadFile(event: any) {
  const file = event.target.files[0];
  this.droppedFile = file;
  this.documentutilef.document=file

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
  this.documentutilef.document=file;
  const dropZone = document.querySelector('.drop-zone');
  if (dropZone) {
    dropZone.innerHTML = file.name;
  }
  
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
checkDuplicateNom(control: AbstractControl): { [key: string]: boolean } | null {
  const nomValue = control.value;
  const isDuplicate = this.documents.some(item => item.nom === nomValue);
  return isDuplicate ? { 'duplicate': true } : null;
}
closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
  }, 2300); 
}
}