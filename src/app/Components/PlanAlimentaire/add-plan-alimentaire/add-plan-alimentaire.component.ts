import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PlanalimentaireService } from 'src/app/Services/Service-PlanAlimentaire/planalimentaire.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';

@Component({
  selector: 'app-add-plan-alimentaire',
  templateUrl: './add-plan-alimentaire.component.html',
  styleUrls: ['./add-plan-alimentaire.component.css']
})
export class AddPlanAlimentaireComponent {

  planALimentaireForm!: FormGroup;
  site$ !: Observable<any>;
  selectedFragment: string = 'i1'; // Default value is 'i1'


  //modal
  @ViewChild('successModal', { static: true }) successModal: any;
  modalRef!: BsModalRef;


  constructor(private fb: FormBuilder, private plaServ: PlanalimentaireService,
    private router: Router,
    private siteService: ApiSiteService,

    private bsModalService: BsModalService,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('fr'); // Use the locale you desire

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
    this.site$ = this.siteService.getAllSite();

    this.createForm();
  }


  createForm() {
    this.planALimentaireForm = this.fb.group({




      matin: [''],
      client: ['', [Validators.required]],
      regime: [''],
      midi: [''],
      alcool: [''],
      texture: [''],
      specificite_diet_matin: [''],
      soir: [''],
      soupe_soir: [''],
      dessert: [''],
      menu_velours_matin: [''],
      soupe_midi: [''],
      specificites_midi: [''],
      taille_portion: [''],
      statut: [''],
      specificite_dessert: [''],
      gouter: [''],
      specifite_gouter: [''],
      localisation_repas: [''],
      specifite_resto_matin: [''],
      menu_velours_soir: [''],
      specificite_diet_soir: [''],
      specificite_resto_soir: [''],
      convictions_alimentaires: [''],
      allergie_intolerance: [''],
      autres_infos_utiles: [''],
      texture_liquides_boissons: [''],
      nbr_mesurettes: [''],
      temp_liquide_boisson: [''],
      site: ['', [Validators.required]],





    });
  }


  onSubmit(): void {

    if (this.planALimentaireForm.valid) {
      const formData = new FormData();
      formData.append('matin', this.planALimentaireForm.get('matin')?.value?.toString() || '');
      formData.append('client', this.planALimentaireForm.get('client')?.value || '');
      formData.append('regime', this.planALimentaireForm.get('regime')?.value || '');
      formData.append('midi', this.planALimentaireForm.get('midi')?.value?.toString() || '');
      formData.append('alcool', this.planALimentaireForm.get('alcool')?.value?.toString() || '');
      formData.append('texture', this.planALimentaireForm.get('texture')?.value || '');
      formData.append('specificite_diet_matin', this.planALimentaireForm.get('specificite_diet_matin')?.value || '');
      formData.append('soir', this.planALimentaireForm.get('soir')?.value?.toString() || '');
      formData.append('soupe_soir', this.planALimentaireForm.get('soupe_soir')?.value || '');
      formData.append('dessert', this.planALimentaireForm.get('dessert')?.value || '');
      formData.append('menu_velours_matin', this.planALimentaireForm.get('menu_velours_matin')?.value?.toString() || '');
      formData.append('soupe_midi', this.planALimentaireForm.get('soupe_midi')?.value || '');
      formData.append('specificites_midi', this.planALimentaireForm.get('specificites_midi')?.value || '');
      formData.append('taille_portion', this.planALimentaireForm.get('taille_portion')?.value?.toString() || '');
      formData.append('statut', this.planALimentaireForm.get('statut')?.value || '');
      formData.append('specificite_dessert', this.planALimentaireForm.get('specificite_dessert')?.value || '');
      formData.append('gouter', this.planALimentaireForm.get('gouter')?.value?.toString() || '');
      formData.append('specifite_gouter', this.planALimentaireForm.get('specifite_gouter')?.value || '');
      formData.append('localisation_repas', this.planALimentaireForm.get('localisation_repas')?.value || '');
      formData.append('specifite_resto_matin', this.planALimentaireForm.get('specifite_resto_matin')?.value || '');
      formData.append('menu_velours_soir', this.planALimentaireForm.get('menu_velours_soir')?.value?.toString() || '');
      formData.append('specificite_diet_soir', this.planALimentaireForm.get('specificite_diet_soir')?.value || '');
      formData.append('specificite_resto_soir', this.planALimentaireForm.get('specificite_resto_soir')?.value || '');
      formData.append('convictions_alimentaires', this.planALimentaireForm.get('convictions_alimentaires')?.value || '');
      formData.append('allergie_intolerance', this.planALimentaireForm.get('allergie_intolerance')?.value || '');
      formData.append('autres_infos_utiles', this.planALimentaireForm.get('autres_infos_utiles')?.value || '');
      formData.append('texture_liquides_boissons', this.planALimentaireForm.get('texture_liquides_boissons')?.value || '');
      formData.append('nbr_mesurettes', this.planALimentaireForm.get('nbr_mesurettes')?.value || '');
      formData.append('temp_liquide_boisson', this.planALimentaireForm.get('temp_liquide_boisson')?.value || '');
      formData.append('site', this.planALimentaireForm.get('site')?.value?.toString() || '');


      this.plaServ.addPlanAlimentaire(formData).subscribe(
        (response) => {
          console.log('constat d"audit ajoutée', response);
          this.openModal();
          this.router.navigate(['/plan-alimentaire-list']);


          console.log("formdata", formData);

        },
        (error) => {
          console.error(error);
        }
      );
    }




  }

  //modal functions 
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
  }



  selectedCheckboxes: string[] = [];


  // toggleCheckbox(checkboxValue: string): void {
  //   const index = this.selectedCheckboxes.indexOf(checkboxValue);

  //   if (index > -1) {
  //     this.selectedCheckboxes.splice(index, 1);
  //   } else {
  //     this.selectedCheckboxes.push(checkboxValue);
  //   }

  //   // Update the form control value with the selected checkboxes
  //   this.planALimentaireForm.controls['texture'].setValue(this.selectedCheckboxes);
  // }

  // toggleCheckboxreg(checkboxValue: string): void {
  //   const index = this.selectedCheckboxes.indexOf(checkboxValue);

  //   if (index > -1) {
  //     this.selectedCheckboxes.splice(index, 1);
  //   } else {
  //     this.selectedCheckboxes.push(checkboxValue);
  //   }

  //   // Update the form control value with the selected checkboxes
  //   this.planALimentaireForm.controls['regime'].setValue(this.selectedCheckboxes);
  // }
  // toggleCheckboxsoupe(checkboxValue: string): void {
  //   const index = this.selectedCheckboxes.indexOf(checkboxValue);

  //   if (index > -1) {
  //     this.selectedCheckboxes.splice(index, 1);
  //   } else {
  //     this.selectedCheckboxes.push(checkboxValue);
  //   }

  //   // Update the form control value with the selected checkboxes
  //   this.planALimentaireForm.controls['soupe_soir'].setValue(this.selectedCheckboxes);
  // }

  // toggleCheckboxtp(checkboxValue: string): void {
  //   const index = this.selectedCheckboxes.indexOf(checkboxValue);

  //   if (index > -1) {
  //     this.selectedCheckboxes.splice(index, 1);
  //   } else {
  //     this.selectedCheckboxes.push(checkboxValue);
  //   }

  //   // Update the form control value with the selected checkboxes
  //   this.planALimentaireForm.controls['taille_portion'].setValue(this.selectedCheckboxes);
  // }

  // toggleCheckboxconv(checkboxValue: string): void {
  //   const index = this.selectedCheckboxes.indexOf(checkboxValue);

  //   if (index > -1) {
  //     this.selectedCheckboxes.splice(index, 1);
  //   } else {
  //     this.selectedCheckboxes.push(checkboxValue);
  //   }

  //   // Update the form control value with the selected checkboxes
  //   this.planALimentaireForm.controls['convictions_alimentaires'].setValue(this.selectedCheckboxes);
  // }
  // toggleCheckboxtlb(checkboxValue: string): void {
  //   const index = this.selectedCheckboxes.indexOf(checkboxValue);

  //   if (index > -1) {
  //     this.selectedCheckboxes.splice(index, 1);
  //   } else {
  //     this.selectedCheckboxes.push(checkboxValue);
  //   }

  //   // Update the form control value with the selected checkboxes
  //   this.planALimentaireForm.controls['texture_liquides_boissons'].setValue(this.selectedCheckboxes);
  // }
  // toggleCheckboxsoupemd(checkboxValue: string): void {
  //   const index = this.selectedCheckboxes.indexOf(checkboxValue);

  //   if (index > -1) {
  //     this.selectedCheckboxes.splice(index, 1);
  //   } else {
  //     this.selectedCheckboxes.push(checkboxValue);
  //   }

  //   // Update the form control value with the selected checkboxes
  //   this.planALimentaireForm.controls['soupe_midi'].setValue(this.selectedCheckboxes);
  // }
  toggleCheckbox(checkboxValue: string, formControlName: string): void {
    // Get the selected checkboxes for the specific field
    let selectedCheckboxes = this.planALimentaireForm.controls[formControlName].value || [];

    const index = selectedCheckboxes.indexOf(checkboxValue);

    if (index > -1) {
      selectedCheckboxes.splice(index, 1);
    } else {
      selectedCheckboxes.push(checkboxValue);
    }

    // Update the form control value with the selected checkboxes for the specific field
    this.planALimentaireForm.controls[formControlName].setValue(selectedCheckboxes);
  }





  menuVeloursMatin: boolean = false;

  toggleMenuVeloursMatin(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const menuVeloursMatinControl = this.planALimentaireForm.get('menu_velours_matin');
    if (menuVeloursMatinControl) {
      menuVeloursMatinControl.setValue(isChecked);
    }
  }


  menuVeloursSoir: boolean = false;

  toggleMenuVeloursSoir(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const menuVeloursSoirControl = this.planALimentaireForm.get('menu_velours_soir');
    if (menuVeloursSoirControl) {
      menuVeloursSoirControl.setValue(isChecked);
    }
  }
  gouter: boolean = false;

  togglegouter(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const gouterControl = this.planALimentaireForm.get('gouter');
    if (gouterControl) {
      gouterControl.setValue(isChecked);
    }
  }

  soir: boolean = false;

  togglesoir(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const soirControl = this.planALimentaireForm.get('soir');
    if (soirControl) {
      soirControl.setValue(isChecked);
    }
  }

  matin: boolean = false;

  togglematin(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const matinControl = this.planALimentaireForm.get('matin');
    if (matinControl) {
      matinControl.setValue(isChecked);
    }
  }

  midi: boolean = false;

  togglemidi(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const midiControl = this.planALimentaireForm.get('midi');
    if (midiControl) {
      midiControl.setValue(isChecked);
    }
  }

  statut: boolean = false;

  togglestatut(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const statutControl = this.planALimentaireForm.get('statut');
    if (statutControl) {
      statutControl.setValue(isChecked);
    }
  }



}
