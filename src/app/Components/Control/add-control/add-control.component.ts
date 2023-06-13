import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ControlService } from 'src/app/Services/Service-control/control.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';

@Component({
  selector: 'app-add-control',
  templateUrl: './add-control.component.html',
  styleUrls: ['./add-control.component.css']
})
export class AddControlComponent {
  ControlForm!: FormGroup;
  site$ !: Observable<any>;
  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;


  constructor(private formBuilder: FormBuilder, private controlService: ControlService,
    private router: Router, 
    private bsModalService: BsModalService,
    private siteService : ApiSiteService) {
    this.ControlForm = this.formBuilder.group({
      site:[''],
      nature_control: [''],
      origine_reglementaire: [''],
      date_dernier_control: [''],
      date_control_suivant: [''],
      action_ouverte: [''],
      rapport:['']
    });
  }
  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);
    this.site$ = this.siteService.getAllSite();
  }
  onSubmit() {
    if (this.ControlForm.valid) {
      const formData = new FormData();
      formData.append('site', this.ControlForm.get('site')?.value);
      formData.append('nature_control', this.ControlForm.get('nature_control')?.value);
      formData.append('origine_reglementaire', this.ControlForm.get('origine_reglementaire')?.value);
      formData.append('date_dernier_control', this.ControlForm.get('date_dernier_control')?.value);
      formData.append('date_control_suivant', this.ControlForm.get('date_control_suivant')?.value);
      formData.append('action_ouverte', this.ControlForm.get('action_ouverte')?.value);
      formData.append('rapport', this.ControlForm.get('rapport')?.value);
      this.controlService.addControlFormData(formData).subscribe(
        (response) => {
          console.log('control ajoutée', response);
          this.openModal();
          this.router.navigate(['/listcontrol']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}
onFileSelected(event: any, field: string) {
  const file: File = event.target.files[0];
  this.ControlForm.get(field)?.setValue(file);
}

}
