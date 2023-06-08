import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ControlService } from 'src/app/Services/Service-control/control.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Control } from 'src/app/models/Control';

@Component({
  selector: 'app-update-control',
  templateUrl: './update-control.component.html',
  styleUrls: ['./update-control.component.css']
})
export class UpdateControlComponent {
  ControlForm!: FormGroup;
  control!: Control;
  id!: number;
  site$ !: Observable<any>;
  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, 
    private router: Router, 
    private controlService: ControlService,
     private bsModalService: BsModalService,
     private siteService : ApiSiteService) { 
    this.ControlForm = new FormGroup({
      site: new FormControl(),
      nature_control : new FormControl(),
      origine_reglementaire : new FormControl(),
      date_dernier_control: new FormControl(),
      date_control_suivant: new FormControl(),
      action_ouverte: new FormControl(),
     
    });
  }
  ngOnInit() {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);
    this.site$ = this.siteService.getAllSite();
    //code
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.controlService.getControlById(this.id).subscribe(
        (data: Control) => {
          this.control = data;
          this.ControlForm = this.formBuilder.group({
            site: [this.control.site, Validators.required],
            nature_control: [this.control.nature_control, Validators.required],
            origine_reglementaire: [this.control.origine_reglementaire, Validators.required],
            date_dernier_control: [this.control.date_dernier_control, Validators.required],
            date_control_suivant: [this.control.date_control_suivant, Validators.required],
            action_ouverte: [this.control.action_ouverte, Validators.required],
            
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log("ID de control introuvable dans l'URL");
      this.ControlForm = this.formBuilder.group({
        site: ['', Validators.required],
        nature_control: [''],
        origine_reglementaire: [''],
        date_dernier_control: [''],
        date_control_suivant: [''],
        action_ouverte: [''],
        
      });
    }
  }
  
  onSubmit() {
    console.log(this.ControlForm.value);
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('site', this.ControlForm.get('site')?.value);
    formData.append('nature_control', this.ControlForm.get('nature_control')?.value);
    formData.append('origine_reglementaire', this.ControlForm.get('origine_reglementaire')?.value);
    formData.append('date_dernier_control', this.ControlForm.get('date_dernier_control')?.value);
    formData.append('date_control_suivant', this.ControlForm.get('date_control_suivant')?.value);
    formData.append('action_ouverte', this.ControlForm.get('action_ouverte')?.value);

    this.controlService.updateControlFormdata(formData).subscribe(
      (data: any) => {
        console.log(data);
        this.openModal();
        this.router.navigate(['/listcontrol']);
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
  

}
