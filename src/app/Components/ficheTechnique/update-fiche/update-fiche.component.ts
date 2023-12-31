import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FicheserService } from 'src/app/Services/Service-fiche-restauration/ficheser.service';
import { FicheTechnique } from 'src/app/models/FicheTechnique';


@Component({
  selector: 'app-update-fiche',
  templateUrl: './update-fiche.component.html',
  styleUrls: ['./update-fiche.component.css']
})
export class UpdateFicheComponent implements OnInit{
  ficheForm!: FormGroup;
  fiche!: FicheTechnique;
  id_fiche!: number;

  fileToUpload: File | null = null;
  selectedFileName: string | null = null;

  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, 
    private router: Router, 
    private ficheService: FicheserService,
     private bsModalService: BsModalService) { 
    this.ficheForm = new FormGroup({
      nom_fiche: new FormControl(),
      type_plat: new FormControl(),
      fichier: new FormControl()
    });
  }
  
  ngOnInit() {
    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');

      // rafraîchir la page
      location.reload();
    }

    // aller en haut de la page
    window.scrollTo(0, 0);
    //code
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id_fiche = +id;
      this.ficheService.getFicheById(this.id_fiche).subscribe(
        (data: FicheTechnique) => {
          this.fiche = data;
          this.ficheForm = this.formBuilder.group({
            nom_fiche: [this.fiche.nom_fiche, Validators.required],
            type_plat: [this.fiche.type_plat, Validators.required],
            fichier: [this.fiche.fichier]
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log("ID de fiche introuvable dans l'URL");
      this.ficheForm = this.formBuilder.group({
        nom_fiche: ['', Validators.required],
        type_plat: ['', Validators.required],
        fichier: ['']
      });
    }
  }
  
  onSubmit() {
    console.log(this.ficheForm.value);
    const formData = new FormData();
    formData.append('id_fiche', this.id_fiche.toString());
    formData.append('nom_fiche', this.ficheForm.get('nom_fiche')?.value);
    formData.append('type_plat', this.ficheForm.get('type_plat')?.value);
  
     // Include the file in the form data if it is not null
  if (this.fileToUpload) {
    formData.append('fichier', this.fileToUpload);
  }
  

    this.ficheService.updateFicheFormdata(formData).subscribe(
      (data: any) => {
        console.log(data);
        this.openModal();
        this.router.navigate(['/listF']);
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