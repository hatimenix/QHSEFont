import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FicheserService } from 'src/app/Services/Service-fiche-restauration/ficheser.service';



@Component({
  selector: 'app-add-fiche',
  templateUrl: './add-fiche.component.html',
  styleUrls: ['./add-fiche.component.css']
})
export class AddFicheComponent {
  ficheForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private ficheService: FicheserService, private router: Router) {
    this.ficheForm = this.formBuilder.group({
      
      nom_fiche: ['', Validators.required],
      type_plat: ['', Validators.required],
      fichier: ['', Validators.required]
    });
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
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.ficheForm.get('fichier')?.setValue(file);
  }

  onSubmit() {
    if (this.ficheForm.valid) {
      const formData = new FormData();
      formData.append('nom_fiche', this.ficheForm.get('nom_fiche')?.value);
      formData.append('type_plat', this.ficheForm.get('type_plat')?.value);
      formData.append('fichier', this.ficheForm.get('fichier')?.value);
  
      this.ficheService.addFicheFormData(formData).subscribe(
        (response) => {
          console.log('fiche ajoutée', response);
          this.router.navigate(['/listF']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
}
