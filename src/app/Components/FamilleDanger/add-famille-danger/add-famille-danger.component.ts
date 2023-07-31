import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FamilleDangerService } from 'src/app/Services/Service-FamilleDanger/famille-danger.service';
import { FamilleDanger } from 'src/app/models/famille-danger';

@Component({
  selector: 'app-add-famille-danger',
  templateUrl: './add-famille-danger.component.html',
  styleUrls: ['./add-famille-danger.component.css']
})
export class AddFamilleDangerComponent {

  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;

  familleForm !: FormGroup;

  constructor( private router : Router, 
    private bsModalService: BsModalService,
    private apiFamilleDangerService : FamilleDangerService,
    private formBuilder: FormBuilder){}

    ngOnInit(): void {

      this.familleForm = this.formBuilder.group({
        famille_nom : ['', Validators.required],
      });

    }

    onSubmit():void {
      const formData = this.familleForm.value;
      const famille: FamilleDanger = new FamilleDanger(
        formData.famille_nom,
      );

      this.apiFamilleDangerService.addFamille(famille).subscribe(
        () => {
          console.log('Evaluation a été ajouté avec succès.');
          this.openModal();
          this.router.navigate(['/familleDanger']);
        },
        error => console.log(error)
      );

    }

    openModal() {
      this.modalRef = this.bsModalService.show(this.successModal);
    }
    closeModal() {
      this.bsModalService.hide();
    }
}
