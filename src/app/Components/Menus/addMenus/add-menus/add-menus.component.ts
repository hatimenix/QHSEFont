import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { MenusService } from 'src/app/Services/Service-Menus/menus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';

@Component({
  selector: 'app-add-menus',
  templateUrl: './add-menus.component.html',
  styleUrls: ['./add-menus.component.css']
})
export class AddMenusComponent implements OnInit {
  MenuForm!: FormGroup;
  site$ !: Observable<any>;
  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;


  constructor(private formBuilder: FormBuilder, private menuService: MenusService,
    private router: Router, 
    private bsModalService: BsModalService,
    private siteService : ApiSiteService) {
    this.MenuForm = this.formBuilder.group({
      site:[''],
      mois_concerne: [''],
      menus_generaux: [''],
      menus_dessert: [''],
      menu_s1: [''],
      menu_s2: [''],
      menu_s3: [''],
      menu_s4: [''],
      menu_s5: [''],
     
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
    this.site$ = this.siteService.getAllSite();
  }
  

  onFileSelected(event: any, field: string) {
    const file: File = event.target.files[0];
    this.MenuForm.get(field)?.setValue(file);
  }
  

  onSubmit() {
    if (this.MenuForm.valid) {
      const formData = new FormData();
      formData.append('site', this.MenuForm.get('site')?.value);
      formData.append('mois_concerne', this.MenuForm.get('mois_concerne')?.value);
      formData.append('menus_generaux', this.MenuForm.get('menus_generaux')?.value);
      formData.append('menus_dessert', this.MenuForm.get('menus_dessert')?.value);
      formData.append('menu_s1', this.MenuForm.get('menu_s1')?.value);
      formData.append('menu_s2', this.MenuForm.get('menu_s2')?.value);
      formData.append('menu_s3', this.MenuForm.get('menu_s3')?.value);
      formData.append('menu_s4', this.MenuForm.get('menu_s4')?.value);
      formData.append('menu_s5', this.MenuForm.get('menu_s5')?.value);
      
  
      this.menuService.addMenuFormData(formData).subscribe(
        (response) => {
          console.log('menu ajoutée', response);
          this.openModal();
          this.router.navigate(['/listMenu']);
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
  
}
