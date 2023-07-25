import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent {
  @ViewChild('successModal', { static: true }) successModal: any;
  personnel$!: Observable<any>;
  modalRef!: BsModalRef;

  constructor(private router: Router, private servicesService: ApiServiceService, private personnelService: PersonnelService, private bsModalService: BsModalService) { }

  mode = 'list';
  servicef = {
    id: 1,
    service_nom: '',
    chef_service: [],
  };
  submitted = false;
  form = new FormGroup({
    service_nom: new FormControl(''),
    chef_service: new FormControl(),
  });

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);

    this.personnel$ = this.personnelService.getPersonnels();
  }

  createService() {
    if (this.form.invalid || this.form.value.service_nom === null || this.form.value.service_nom === undefined) {
      return;
    }

    const formData = new FormData();

    // Check if service_nom is not null and not undefined before appending it to FormData
    if (this.form.value.service_nom !== null && this.form.value.service_nom !== undefined) {
      formData.append('service_nom', String(this.form.value.service_nom));
    }

    // Check if chef_service is not null and not undefined before appending it to FormData
    if (this.form.value.chef_service !== null && this.form.value.chef_service !== undefined) {
      // Convert the chef_service value to an array and append it to the form data
      const chefServiceIds: number[] = this.form.value.chef_service;
      chefServiceIds.forEach((chefServiceId) => {
        formData.append('chef_service', String(chefServiceId));
      });
    }

    this.servicesService.create(formData).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/listServices']);
        this.openModal();
        this.submitted = true;
      },
      (error) => {
        console.error(error);
        this.submitted = false;
      }
    );
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
    location.reload();
  }
}
