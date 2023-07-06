import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { PjService } from 'src/app/Services/Service-pj/pj.service';
import { Pj } from 'src/app/models/pj';

@Component({
  selector: 'app-update-pj',
  templateUrl: './update-pj.component.html',
  styleUrls: ['./update-pj.component.css']
})
export class UpdatePjComponent {
  pjForm!: FormGroup;
  pj!: Pj;
  id!: number;
  personnel$!: Observable<any>;
  selectedFile!: File;
  fileToUpload: File | null = null;
 selectedFileName: string | null = null;
  //modal
  @ViewChild('successModal', { static: true }) successModal: any;
  modalRef!: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pjService : PjService,
    private personnelService: PersonnelService,
    
    private bsModalService: BsModalService) {
    this.pjForm = new FormGroup({
      nom: new FormControl(),
      url_document: new FormControl() ,
      date_modification: new FormControl(),
      modifie_par: new FormControl(),
    
    });
  }

  ngOnInit() {
    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);
    this.personnel$ = this.personnelService.getPersonnels();
    //code
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.pjService.getPjById(this.id).subscribe(
        (data: Pj) => {
          this.pj = data;
          this.pjForm = this.formBuilder.group({
            nom: [this.pj.nom, Validators.required],
            url_document: [this.pj.url_document || ''], 
            date_modification: [this.pj.date_modification, Validators.required],
            modifie_par: [this.pj.modifie_par, Validators.required],
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
      
    } else {
      console.log("ID de document introuvable dans l'URL");
      this.pjForm = this.formBuilder.group({
        nom: ['', Validators.required],
        url_document: ['', Validators.required],
        date_modification: [''],
        modifie_par: [''],
        
        
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nom', this.pjForm.value.nom);
    formData.append('date_modification', this.pjForm.value.date_modification);
    formData.append('modifie_par', this.pjForm.value.modifie_par);
    
if (this.fileToUpload) {
  formData.append('url_document', this.fileToUpload);
}
 

  
    this.pjService.updatePjFormdata(this.id, formData).subscribe(
      (data: any) => {
        console.log(data);
        console.log("modification avec succès");
        this.openModal();
        this.router.navigate(['/listpj']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
  }
  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const file: File | null = fileInput.files?.[0] || null;
    this.fileToUpload = file;
  
    if (file) {
      this.selectedFileName = file.name;
    } else {
      this.selectedFileName = null;
    }
  }
}
