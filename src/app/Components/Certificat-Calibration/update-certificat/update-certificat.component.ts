import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CertificatService } from 'src/app/Services/Service-Certificat/certificat.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { CertificatCalibration } from 'src/app/models/CertificatCalibration';

@Component({
  selector: 'app-update-certificat',
  templateUrl: './update-certificat.component.html',
  styleUrls: ['./update-certificat.component.css']
})
export class UpdateCertificatComponent {
  certificatForm!: FormGroup;
  certificat!: CertificatCalibration;
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
    private certificatService : CertificatService,
    private personnelService: PersonnelService,
    
    private bsModalService: BsModalService) {
    this.certificatForm = new FormGroup({
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
      this.certificatService.getCertificatById(this.id).subscribe(
        (data: CertificatCalibration) => {
          this.certificat = data;
          this.certificatForm = this.formBuilder.group({
            nom: [this.certificat.nom, Validators.required],
            url_document: [this.certificat.url_document || ''], 
            date_modification: [this.certificat.date_modification, Validators.required],
            modifie_par: [this.certificat.modifie_par, Validators.required],
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
    formData.append('nom', this.certificatForm.value.nom);
    formData.append('date_modification', this.certificatForm.value.date_modification);
    formData.append('modifie_par', this.certificatForm.value.modifie_par);
    if (this.fileToUpload) {
      formData.append('fichier', this.fileToUpload);
    }

  
    this.certificatService.updateCertificatFormdata(this.id, formData).subscribe(
      (data: any) => {
        console.log(data);
        console.log("modification avec succès");
        this.openModal();
        this.router.navigate(['/listcertificat']);
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
