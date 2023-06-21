import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { PjService } from 'src/app/Services/Service-pj/pj.service';
import { RapportAuditService } from 'src/app/Services/Service-rapport-audit/rapport-audit.service';
import { Pj } from 'src/app/models/pj';
import { RapportAudit } from 'src/app/models/rapportAudit';

@Component({
  selector: 'app-update-rapport-audit',
  templateUrl: './update-rapport-audit.component.html',
  styleUrls: ['./update-rapport-audit.component.css']
})
export class UpdateRapportAuditComponent {
  rpForm!: FormGroup;
  rp!: RapportAudit;
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
    private rpService : RapportAuditService,
    private personnelService: PersonnelService,
    
    private bsModalService: BsModalService) {
    this.rpForm = new FormGroup({
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
      this.rpService.getRapportById(this.id).subscribe(
        (data: RapportAudit) => {
          this.rp = data;
          this.rpForm = this.formBuilder.group({
            nom: [this.rp.nom, Validators.required],
            url_document: [this.rp.url_document || ''], 
            date_modification: [this.rp.date_modification, Validators.required],
            modifie_par: [this.rp.modifie_par, Validators.required],
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
      
    } else {
      console.log("ID de document introuvable dans l'URL");
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nom', this.rpForm.value.nom);
    formData.append('date_modification', this.rpForm.value.date_modification);
    formData.append('modifie_par', this.rpForm.value.modifie_par);
    if (this.fileToUpload) {
      formData.append('url_document', this.fileToUpload);
    }

  
    this.rpService.updateRapportFormdata(this.id, formData).subscribe(
      (data: any) => {
        console.log(data);
        console.log("modification avec succès");
        this.openModal();
        this.router.navigate(['/listrapport']);
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
