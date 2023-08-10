import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Exigences } from 'src/app/models/exigences';
import { ExigencesService } from 'src/app/Services/Service-exigences/exigences.service';
import { PartieService } from 'src/app/Services/Service-partie/partie.service';

declare var window: any;

@Component({
  selector: 'app-list-exigences',
  templateUrl: './list-exigences.component.html',
  styleUrls: ['./list-exigences.component.css']
})
export class ListExigencesComponent {
  partieinteressess: any[] = [];
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.exigences.length / this.itemsPerPage);
  }

  get displayedEsigences(): Exigences[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.exigences.slice(startIndex, endIndex);
  }
  id : any 
  type_exigence:any
  intitule:any
  evaluation_maitrise:any
  description:any
  commentaire:any
  action:any
  partieinteresses:any;
  partieinteresses_name:any
  searchQuery: string = '';
  exigences : Exigences[] = []
  deleteModal: any;
  idTodelete: number = 0;

  form = new FormGroup({
    type_exigence: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    intitule: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    evaluation_maitrise: new FormControl('', [Validators.minLength(3),Validators.maxLength(40)]),
    description: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    commentaire: new FormControl('', [Validators.minLength(3),Validators.maxLength(255)]),
    action: new FormControl(''),
    partieinteresses: new FormControl(''),

  });
  constructor(private   exigenceservice : ExigencesService, private router : Router,private partieservice :PartieService, private bsModalService: BsModalService){

  }
  ngOnInit(): void {
    this.partieservice.getAll().subscribe(
      (data: any[]) => {
        this.partieinteressess = data;
        console.log(this.partieinteressess); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );  
    this.getExigences();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0]; 
  }
  getExigences() {
    this.exigenceservice.getAllExigences().subscribe(
      res => {
        this.exigences = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  navigateToExigence() {
    this.router.navigate(['/add-exigence']);
  }
  updateExigence() : void {
    const formData =  new FormData()
    formData.append("partieinteresses", this.partieinteresses);
    formData.append("type_exigence", this.type_exigence);
    formData.append("intitule", this.intitule);
    formData.append("evaluation_maitrise", this.evaluation_maitrise);
    formData.append("description", this.description);
    formData.append("commentaire", this.commentaire);
    formData.append("action", this.action);

  this.exigenceservice.updateExigenceFormdata(this.id, formData)

  .subscribe({
      next: (res) => {
          console.log(res);
          this.openModal();
          this.updateModalVisible = false;
          this.closeSuccessModalAfterDelay();
      },
      error: (e) => {
          console.error(e);
      }
  });
}
get f() {
  return this.form.controls;
}
getExigenceData( id : number,
  type_exigence : any,
  intitule : any  ,
  evaluation_maitrise : any , 
  description :any,
  commentaire:any,
  action:any,
  partieinteresses:any,
){
  this.id = id,
  this.type_exigence=type_exigence,
  this.intitule = intitule,
  this.evaluation_maitrise=evaluation_maitrise,
  this.description=description,
  this.commentaire=commentaire
  this.action=action,
  this.partieinteresses=partieinteresses

}
openDeleteModal(id: number) {
  this.idTodelete = id;
  this.deleteModal.show();
}


delete() {
  this.exigenceservice.delExigence(this.idTodelete).subscribe({
    next: (data) => {
      this.exigences = this.exigences.filter(_ => _.id != this.idTodelete)
      location.reload()
      this.deleteModal.hide();
    },
    error:(err) => {
      console.log(err);
    }


    
  });
}
openModal() {
  this.modalRef = this.bsModalService.show(this.successModal);
}
closeModal() {
  this.bsModalService.hide();
  location.reload();
}
resetSearchQuery() {
  this.searchQuery = '';
}
onItemsPerPageChange(option: number) {
  this.p = 1; 
  this.itemsPerPage = option; 
}
getPageNumbers(): number[] {
  const pageNumbers = [];
  for (let i = 1; i <= this.totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}
getDisplayedRange(): string {
  const startIndex = (this.p - 1) * this.itemsPerPage + 1;
  const endIndex = Math.min(this.p * this.itemsPerPage, this.exigences.length);
  return `Affichage de ${startIndex} à ${endIndex} de ${this.exigences.length} entrées`;
}

getRecordCount(partieinteresses: any): number {
  const matchingExigences = this.exigences.filter(exigence =>
    (exigence.type_exigence && exigence.type_exigence.includes(this.searchQuery)) ||
    (exigence.intitule && exigence.intitule.includes(this.searchQuery)) ||
    (exigence.evaluation_maitrise && exigence.evaluation_maitrise.includes(this.searchQuery)) 
  );

  const count = matchingExigences.filter(exigence =>
    exigence.partieinteresses.includes(partieinteresses.id)
  ).length;

  return count;
}

closeSuccessModalAfterDelay(): void {
  setTimeout(() => {
    this.modalRef.hide();
    location.reload();
  }, 2300); 
}
searchAndExpand(query: string) {
  this.searchQuery = query;
  this.partieinteressess.forEach(partieinteresses => {
    partieinteresses.expanded = false;
  });

  const matchingExigences = this.exigences.filter(exigence =>
    (exigence.type_exigence && exigence.type_exigence.includes(query)) ||
    (exigence.intitule && exigence.intitule.includes(query)) ||
    (exigence.evaluation_maitrise && exigence.evaluation_maitrise.includes(query))
  );
  matchingExigences.forEach(matchingExigence => {
    const matchingPartieinteresse = this.partieinteressess.find(partieinteresses =>
      matchingExigence.partieinteresses.includes(partieinteresses.id)
    );  
    if (matchingPartieinteresse) {
      matchingPartieinteresse.expanded = true;
    }
  });
  
}
}